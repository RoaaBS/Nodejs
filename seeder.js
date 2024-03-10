const{ Book}=require("./models/Book");
const{ Author}=require("./models/Author");
const {books,authors}=require("./data");
const connectToDB =require("./config/db");
require("dotenv").config();

//connection To DB
connectToDB();

//import books (seeding database)

const importBooks =async () =>{
    try{
  await Book.insertMany(books);
   console.log("Book imported");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
//import Authors (seeding database)

const importAuthors =async () =>{
    try{
  await Author.insertMany(authors);
   console.log("Author imported");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
//remove  books 

const removeBooks =async () =>{
    try{
  await Book.insertMany(books);
   console.log("Book Removed!");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
//remove  authors 

const removeauthors =async () =>{
    try{
  await Author.insertMany(authors);
   console.log("Author removed!");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

  if(process.argv[2]=== "-import"){
    importBooks();
  }else if(process.argv[2]=== "-remove"){
    removeBooks();
  }
  if(process.argv[2]=== "-import-authors"){
    importAuthors();
  }else if(process.argv[2]=== "-remove-authors"){
    removeauthors();
  }