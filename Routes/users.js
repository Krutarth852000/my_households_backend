const { User } = require("../models/userModel.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user)
      return res.json({ status: "error", error: "account already exists" });
    // status(400).send('User already registered.')
    else {
      user = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        email: req.body.email,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      const token = jwt.sign(
        {
          _id: user.id,
          FirstName: user.FirstName,
          LastName: user.LastName,
          email: user.email,
        },
        config.get("jwtPrivateKey")
      );
    
      return res.json({
        status: "ok",
        user: token,
        header: "access-control-expose-headers",
      });
      // res.header("x-auth-token", token).send(user);
    }
  } catch (e) {
    console.error(e.message);
    return res.send("Invalid data");
  }
});

router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});
// router.get('/paid/:id', async (req, res) => {
//   const paidById = req.params.id;
//   const user = await User.finf({ _id: paidById })
//   res.send(user)

// })
router.get("/:email", async (req, res) => {
  console.log("Called", req.params.email);
  const user = await User.findOne({ email: req.params.email });
  console.log(user);
  if (!user) return res.status(404).send("User not found.");
  //   delete user.password;
  return res.send({
    FirstName: user.FirstName,
    email: user.email,
    id: user._id,
  });
});

module.exports = router;
// export { validateUser as validate };
