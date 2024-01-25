const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors')
const mainRouter = require("./routes/index");
const userRouter = require('./routes/user')
const accountRouter = require('./routes/account')

const app = express();

//mongoDb
mongoose.connect('mongodb://0.0.0.0:27017/paytm')
.then(() => console.log("Mongodb connected"));

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.get("/", (req,res)=>{
    return res.json({message: "hii"})
})


app.listen(6000, () => {console.log("Port started at 6000")});


