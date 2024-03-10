const asyncHandler =require("express-async-handler");

const { Book,validateUpdateBook,validateCreatBook } = require("../models/Book");




const getAllBooks =asyncHandler(async(req,res,next)=>{
    console.log(req.query);
    const books= await Book.find({price:{$ne:10}}).populate("author");
    res.status(200).json(books);

});

const getBookById=asyncHandler(async(req,res)=>{
    const book=  await Book.findById(req.params.id).populate("author");
     if(book){
       res.status(200).json(book);
    } else{
       res.status(404).json({message:"book not found "});
    }
   });


    /**
 * creat new book
 * @route /api/books
 * @method Post
 * @access private (only admin)
 */
const createBook =asyncHandler(async(req,res)=>{
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
});



/**
 * update books 
 * @route /api/books
 * @method put
 * @access private (only admin)
 */

const updateBook=asyncHandler(async(req,res)=>{
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
});



/**
 * Delete books 
 * @route /api/books
 * @method delete
 * @access private (only admin)
 */
const deleteBook=asyncHandler(async(req,res)=>{
    
    const book =await Book.findByIdAndUpdate(req.params.id);
    if (book){
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "book has been deleted"});
    }
    else{
        res.status(404).json({ message: "book not found"});
    }
});
module.exports={
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};