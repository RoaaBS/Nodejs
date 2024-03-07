const mongoose = require('mongoose');
const Joi = require('joi');

const AuthorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:200,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:200,
    },

},{
    timestamps:true
});


const Author =mongoose.model("Author",AuthorSchema);


function validateCreatAuthor(obj){
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200).required(),
        lastname: Joi.string().trim().min(3).max(200).required(),
      });
   
     return schema.validate(obj);
}
function validateUpdateAuthor(obj){
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200),
        lastname: Joi.string().trim().min(3).max(200),
      });
   
     return schema.validate(obj);
}
module.exports ={
    Author,
    validateCreatAuthor,
    validateUpdateAuthor
};