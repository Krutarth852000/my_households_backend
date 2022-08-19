const mongoose= require("mongoose");
const Joi = require("joi");
const { newGroup } = require("./groupModal");
const { User } = require("./userModel");

const expense = mongoose.model('expense', new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            maxlength: 125
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        groupId: {

            type: mongoose.Schema.Types.ObjectId,
            ref: newGroup,
            required: true,
        },
        paidBy: {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,  
        },
        membersBalance: {
            type: Array,
            required: true,
            default: [],
        },
        settledMembers: {
            type: Array,
            default: [],
        },
        isSettled: {
            type: Boolean,
            default: false,
        },
    }
));

exports.expense = expense;