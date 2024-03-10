const express = require("express");
const router= express.Router();
const asyncHandler =require("express-async-handler");
const {verifyTokenandAdmin}=require("../middleware/verifyToken");
const {getAllBooks,getBookById,createBook,updateBook,deleteBook}=require("../controllers/bookController");

//api/books
router.route("/")
       .get(getAllBooks)
       .post(verifyTokenandAdmin,createBook);
//api/books/:id

router.route("/:id").get(getBookById)
     .put(verifyTokenandAdmin,updateBook)
     .delete(verifyTokenandAdmin,deleteBook);




 module.exports=router;