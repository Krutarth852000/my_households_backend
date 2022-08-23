const mongoose = require("mongoose");
const express = require("express");
const { newGroup } = require("../models/groupModal");

const calculateSplit = require("../services/expenseServices");
const { expense } = require("../models/expenseModal");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { groupId, paidBy, description, amount } = req.body;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(404).send("invalid id");
  }
  const members = await newGroup.findById(groupId);
  // console.log(members.MemberList);
  const membersList = members.MemberList;
  const length = membersList.length;
  console.log(membersList, length);
  if (!members) {
    return res.status(404).send("Group not found");
  }
  const membersBalance = calculateSplit(paidBy, membersList, length, amount);
  const expenses = new expense({
    description,
    amount,
    date: Date.now(),
    groupId: groupId,
    paidBy,
    membersBalance,
    settledMembers: [],
  });

  await expenses.save();
  res.send(expenses);
});
router.get("/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  console.log(groupId);
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(404).send("invalid id");
  }
  const expenses = await expense
    .find({ groupId: groupId })
    .populate("paidBy", "FirstName");
  console.log(expenses);
  if (expenses) {
    return res.send(expenses);
  }
  return res.send('no expense added yet')
});

module.exports = router;
