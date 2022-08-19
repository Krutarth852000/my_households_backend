const { User, validate } = require('../models/userModel.js');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { JsonWebTokenError } = require('jsonwebtoken');

router.post('/', async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.json({status:"error", error:"user not found"});
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    else {  
        const token = jwt.sign({ _id: user.id, FirstName: user.FirstName, LastName: user.LastName, email:user.email }, config.get('jwtPrivateKey'));
       return res.json({status:"ok", user:token});
    }
})


module.exports = router;

