const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require('./Routes/users.js');
const auth = require('./Routes/auth.js');
const group = require('./Routes/group.js');
const list = require('./Routes/shopList.js');
const expense = require('./Routes/expense.js');
const app = express();
const config = require('config');

if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR: jwtPrivateKey not defined.");
    process.exit(1);
}
app.use(cors('*'));
app.get("/", (req, res)=>{res.send("hi")});
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/group', group);
app.use('/api/list', list);
app.use('/api/expense', expense);


mongoose.connect("mongodb+srv://Krutarth852000:Krutarth852000@cluster0.5kehpzq.mongodb.net/?retryWrites=true&w=majority");
app.listen(3001, ()=>{
    console.log("running on port 3001")
})