const mongoose= require("mongoose");
const Joi = require("joi");
const { newGroup } = require("./groupModal");


const shopList= mongoose.model('shopList', new mongoose.Schema(
    {
        category: {
           type: String, required: true,minlength:2, maxlength: 125,
        },
        groupId: { type:mongoose.Schema.Types.ObjectId , ref:newGroup , required:true},
        list: [{

            itemName: { type: String, required: true, maxlength: 125 } 
        }
        ]
       
    }
));
exports.shopList = shopList;
