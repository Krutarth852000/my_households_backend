const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { newGroup } = require("../models/groupModal");
const { User } = require("../models/userModel");
const { shopList } = require("../models/shopList");
const { expense } = require("../models/expenseModal");

router.post("/", async (req, res) => {
  const group = new newGroup({
    GroupName: req.body.GroupName,
    MemberList: req.body.MemberList,
  });
  await group.save();

  res.send(group._id);
});
router.get("/", async (req, res) => {
  const group = await newGroup.find().select("_id");
  res.send(group);
});
router.get("/detail/:groupId", async (req, res) => {
  const group = await newGroup.findById(req.params.groupId);
  res.send(group);
});
router.get("/:userId", async (req, res) => {
  let groups = await newGroup.find({ "MemberList.id": req.params.userId });
  groups = await Promise.all(groups);
  res.send(groups);
});
router.post("/:groupId/member/:memberId", async (req, res) => {
  const idGroup = req.params.groupId;
  const idMember = req.params.memberId;
  if (!mongoose.Types.ObjectId.isValid(idMember)) {
    return res.status(404).send("invalid id");
  }
  if (!mongoose.Types.ObjectId.isValid(idGroup)) {
    return res.status(404).send("invalid id group");
  }
  const group = await newGroup.findById(idGroup);
  if (!group) {
    return res.status(404).send("Group not found");
  }
  const member = await User.findById(idMember);
  if (!member) {
    return res.status(404).send("Member not found");
  }
  const obj = {
    FirstName: member.FirstName,
    id: member._id,
    email: member.email,
  };
  group.MemberList.push(obj);
  await group.save();
  res.send(group);
});
// delete group
router.delete("/:groupId", async (req, res) => {
  console.log(req.params.groupId);
  const groupId = req.params.groupId;
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(404).send("invalid id group");
  }
  const group = await newGroup.findById(groupId);
  if (!group) {
    return res.status(404).send("group not found");
  }
  const list = await shopList.deleteMany({
    groupId: new mongoose.Types.ObjectId(group._id),
  });
  const expenses = await expense.deleteMany({
    groupId: new mongoose.Types.ObjectId(group._id),
  });
  const result = await newGroup.deleteOne({ _id: groupId });
  if (result) {
    return res.send("group Deleted");
  }
  return res.send("error");
});
// delete member
router.delete("/:groupId/member/:memberId", async (req, res) => {
  const idGroup = req.params.groupId;
  const idMember = req.params.memberId;
  if (!mongoose.Types.ObjectId.isValid(idMember)) {
    return res.status(404).send("invalid id");
  }
  if (!mongoose.Types.ObjectId.isValid(idGroup)) {
    return res.status(404).send("invalid id group");
  }
  const group = await newGroup.findById(idGroup);
  if (!group) {
    return res.status(404).send("Group not found");
  }

  const index = group.MemberList.findIndex(
    (list) => list.id.toString() === idMember
  );
  console.log(index, idMember, group.MemberList);
  if (index > -1) {
    group.MemberList.splice(index, 1);
    await group.save();
  }
  if (group.MemberList.length > 0) {
    return res.send(group);
  } else {
    const result = await newGroup.deleteOne({ _id: idGroup });
    return res.send("group Deleted");
  }
});

module.exports = router;
