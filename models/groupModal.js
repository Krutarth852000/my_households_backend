const mongoose= require("mongoose");
const Joi = require("joi");
const { User } = require("./userModel");

const newGroup = mongoose.model('newGroup', new mongoose.Schema(
    {
        GroupName: { type: String, required: true, maxlength: 125 },
        MemberList: {
            type: [{
                FirstName: String,
                id: mongoose.Schema.Types.ObjectId,
                email:String
            }],
            ref: User
        }
    }
));
const validateGroup = (user) => {
  const schema = {
    GroupName: Joi.string().min(1).max(50).required(),
  };
  return Joi.object(schema).validate(user);
};

exports.newGroup = newGroup;
exports.validateGroup;
// export { validateGroup  };
