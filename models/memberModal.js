const mongoose= require("mongoose");
const Joi = require("joi");
const { User } = require("./userModel");
const { newGroup } = require("./groupModal");

const memberdetails = mongoose.model('memberdetails', new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: newGroup, required: true },
    amountOwe: { type: Number, min: 0 },
    amountLent:{type:Number, min:0}
}))

exports.memberdetails = memberdetails;