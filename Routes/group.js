const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { newGroup } = require("../models/groupModal");
const { User } = require("../models/userModel");

router.post("/", async (req, res) => {
  const group = new newGroup({
    GroupName: req.body.GroupName,
    MemberList: req.body.MemberList,
  });
  await group.save();

  res.send(group._id);
});
router.get('/',async (req, res) => {
    const group = await newGroup.find().select('_id');
    res.send(group);
})
router.get('/detail/:groupId',async (req, res) => {
    const group = await newGroup.findById(req.params.groupId);
    res.send(group);
})
router.get('/:userId', async (req, res) => { 
    let groups = await newGroup.find({ "MemberList.id": req.params.userId });
     groups = await Promise.all(groups);
    res.send(groups);
})
router.post('/:groupId/member/:memberId', async (req, res) => {
  const idGroup = req.params.groupId;
  const idMember = req.params.memberId;
  if (!mongoose.Types.ObjectId.isValid(idMember)) {
        res.status(404).send("invalid id");
  }
   if (!mongoose.Types.ObjectId.isValid(idGroup)) {
        res.status(404).send("invalid id group");

  }
  const group = await newGroup.findById(idGroup);
  if (!group) {
    res.status(404).send("Group not found");
  }
  const member = await User.findById(idMember);
  if (!member) {
    res.status(404).send("Member not found");
  }
  const obj = {
    FirstName: member.FirstName,
    id: member._id,
    email: member.email
  }
  group.MemberList.push(obj);
  await group.save();
  res.send(group);
})

  router.delete('/:groupId/member/:memberId', async (req, res) => {
  const idGroup = req.params.groupId;
  const idMember = req.params.memberId;
  if (!mongoose.Types.ObjectId.isValid(idMember)) {
        res.status(404).send("invalid id");
  }
   if (!mongoose.Types.ObjectId.isValid(idGroup)) {
        res.status(404).send("invalid id group");

  }
  const group = await newGroup.findById(idGroup);
  if (!group) {
    res.status(404).send("Group not found");
  }

  const index = group.MemberList.findIndex(list => list.id.toString() === idMember);
console.log(index, idMember, group.MemberList);
 if (index > -1) {
      group.MemberList.splice(index, 1);
      await group.save();
    }
    res.send(group);
})
//     const user = await User.findById(req.params.userId);
//     res.send(user);
//     const group = await Group.find()

//    const group = await newGroup.find().select('_id');
//     res.send(group);
// })
// router.post("/:groupId/member/:memberId", async (req, res) => {
//   const groupId = req.params.groupId;
//   const memberId = req.params.memberId;
//   const group = await newGroup.findById(groupId);
//   if (!group) {
//     res.status(404).send("Group not found");
//   }
//   const member = await User.findById(memberId);
//   if (!member) {
//     res.status(404).send("Member not found");
//   }
//   group.MemberList.push(memberId);

// //   const expenses = await Expense.find({ group: groupId });

// //   const updatedMemberBalances = await updateMemberBalances(
// //     expenses,
// //     group.members
// //   );

// //   await Promise.all(
// //     updatedMemberBalances.map(async (memberBalances) => {
// //       await Expense.updateOne(
// //         { _id: memberBalances.expenseId },
// //         { $set: { membersBalance: memberBalances.membersBalance } }
// //       );
// //     })
// //   );

//   await group.save();
//   res.send(group);
// });



module.exports = router;