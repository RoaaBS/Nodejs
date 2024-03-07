const express = require("express");
const router= express.Router();
const asyncHandler =require("express-async-handler");
const {verifyTokenandAdmin}=require("../middleware/verifyToken");

const { Book,validateUpdateBook,validateCreatBook } = require("../models/Book");





router.get("/",asyncHandler(async(req,res,next)=>{
    const books= await Book.find().populate("author");
    res.status(200).json(books);
}));



router.get("/:id",asyncHandler(async(req,res)=>{
    const book=  await Book.findById(req.params.id).populate("author");
     if(book){
       res.status(200).json(book);
    } else{
       res.status(404).json({message:"book not found "});
    }
   }));

   /**
 * creat new book
 * @route /api/books
 * @method Post
 * @access private (only admin)
 */
router.post("/",verifyTokenandAdmin,asyncHandler(async(req,res)=>{
    const {error} = validateCreatBook(req.body);


 if(error){
   return res.status(400).json({ message:error.details[0].message});
 }


  const book= new Book({

    title:req.body.title,
    description:req.body.description,
    author:req.body.author
   }) 
const result = await book.save();
 res.status(201).json(result);
}));



/**
 * update books 
 * @route /api/books
 * @method put
 * @access private (only admin)
 */
router.put("/:id",verifyTokenandAdmin,asyncHandler(async(req,res)=>{
    const { error }= validateUpdateBook(req.body);


    if(error){
      return res.status(400).json({ message:error.details[0].message});
    }
    const updatedBook =await Book.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            description:req.body.description,
            author:req.body.author 
        }
    },{new:true});
    res.status(200).json(updatedBook);
}));
/**
 * Delete books 
 * @route /api/books
 * @method delete
 * @access private (only admin)
 */

router.delete("/:id",verifyTokenandAdmin,asyncHandler(async(req,res)=>{
    
    const book =await Book.findByIdAndUpdate(req.params.id);
    if (book){
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "book has been deleted"});
    }
    else{
        res.status(404).json({ message: "book not found"});
    }
}));




 module.exports=router;