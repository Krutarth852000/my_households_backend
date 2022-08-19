const mongoose= require("mongoose");
const Joi = require("joi");
 
const User = mongoose.model("User", new mongoose.Schema(
    {
        FirstName:{type:String,  required:true, minlength:5, maxlength:50},
        LastName:{type:String,  required:true, minlength:5, maxlength:50},
        email:{type:String,  required:true, unique:true, minlength:5, maxlength:255},
        password: { type: String, required: true, minlength: 5, maxlength: 1024 },
        
    },
))

// function validateUser(user) {
//     const schema = Joi.object( {
//         FirstName: Joi.string().minlength(5).maxlength(50).required(),
//         LastName: Joi.string().minlength(5).maxlength(50).required(),
//         email: Joi.string().minlength(5).maxlength(255).required().email(),
//         password: Joi.string.minlength(5).maxlength(1024).required()
//     });
//     return Joi.validate(user, schema);
// }

exports.User = User;
// exports.validate = validateUser;
