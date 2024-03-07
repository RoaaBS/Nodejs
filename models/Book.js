const mongoose = require('mongoose');
const Joi = require('joi');


const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        maxlength:200,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
       
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        
        ref:"Author"
    }

},{
    timestamps:true
});
const Book =mongoose.model("Book",BookSchema);


function validateCreatBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(7).max(200).required(),
        description: Joi.string().trim().min(7).required(),
        author:Joi.string().required(),
      });
   
     return schema.validate(obj);
}
function validateUpdateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
        description: Joi.string().trim().min(7),
        author:Joi.string().required(),
      });
   
     return schema.validate(obj);
}

module.exports={
    Book,
    validateUpdateBook,
    validateCreatBook
};