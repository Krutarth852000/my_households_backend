const mongoose = require("mongoose");
const express = require("express");
const { shopList } = require("../models/shopList");
const router = express.Router();

router.post("/", async (req, res) => {
    console.log("called", req.body);
        const List = new shopList ({
            category: req.body.category,
            groupId: req.body.groupId,
            list: req.body.list               
        });
        await List.save();
        res.send(List);
});


router.get("/:groupId", async (req, res) => {
    const groupId = req.params.groupId;
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        res.status(404).send("invalid id");
    }
    let list = await shopList.find({ groupId: groupId });
    list = await Promise.all(list);
    res.send(list);
});


router.post("/append/:listId", async (req, res) => {
    const listId = req.params.listId;
    if (!mongoose.Types.ObjectId.isValid(listId)) {
        res.status(404).send("invalid id");
    }
    const templist = await shopList.findById(listId);  
    templist.list.push(req.body.list);
    await templist.save();
    res.send(templist);
})


router.delete("/:itemId/:listId", async (req, res) => {
    const itemId = req.params.itemId;
    const listId = req.params.listId;
    console.log(itemId, listId);
    const data = await shopList.findById(itemId);
        const index = data.list.findIndex(list => list._id.toString() === listId)
        // console.log(index);
        if (index > -1) {
            data.list.splice(index, 1);
            await data.save();
        }
    if (data.list.length === 0) {
        const response = await shopList.findByIdAndRemove(itemId);
        res.send(response);
    }
        console.log(data.list);
        res.send(data);
})


module.exports = router;