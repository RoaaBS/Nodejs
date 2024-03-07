const express = require("express");
const router= express.Router();
const asyncHandler =require("express-async-handler");
const {verifyTokenandAdmin}=require("../middleware/verifyToken");
const { Author,validateUpdateAuthor,validateCreatAuthor } = require("../models/Author");



router.get("/",asyncHandler(
    async(req,res)=>{
     const authorList = await Author.find();
     res.status(200).json(authorList);
     
}));

router.get("/:id",asyncHandler(async(req,res)=>{
   
        const author = await Author.findById(req.params.id);
     if(author){
       res.status(200).json(author);
    } else{
       res.status(404).json({message:"author not found "});
    }
    
}));
/**
 * creat new author 
 * @route /api/authors
 * @method Post
 * @access private (only admin)
 */
router.post("/", verifyTokenandAdmin,asyncHandler(async(req,res)=>{
    const { error }= validateCreatAuthor(req.body);


 if(error){
   return res.status(400).json({ message:error.details[0].message});
 }



    const author= new Author({
        firstName:req.body.firstName,
        lastname:req.body.lastname,
       });
     
      const result= await author.save();
    
     res.status(201).json(result);


}));

/**
 * update author 
 * @route /api/authors
 * @method Post
 * @access private (only admin)
 */
router.put("/:id",verifyTokenandAdmin,asyncHandler(async(req,res)=>{
    const { error }= validateUpdateAuthor(req.body);


    if(error){
      return res.status(400).json({ message:error.details[0].message});
    }const author = await Author.findByIdAndUpdate(req.params.id,{
        $set: {
            firstName:req.body.firstName,
            lastname:req.body.lastname,
        }
    
       },{new:true});
       res.status(200).json(author);
       
 
}));

/**
 * Delete author 
 * @route /api/authors
 * @method Post
 * @access private (only admin)
 */

router.delete("/:id",verifyTokenandAdmin,asyncHandler(async(req,res)=>{
    
     const author =await Author.findById(req.params.id);
      if (author) {
          await Author.findByIdAndDelete(req.params.id);
          res.status(200).json({ message: "author has been deleted"});
      }
      else{
          res.status(404).json({ message: "author not found"});
      }
    
  }));



 module.exports =router;