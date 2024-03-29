const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/user')
const accountRouter = require('./routes/account')

const app = express();

//mongoDb
mongoose.connect('mongodb://0.0.0.0:27017/paytm', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("MongoDB connected");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.get("/", (req,res)=>{
    return res.json({message: "hii"})
})


app.listen(3000, () => {console.log("Port started at 3000")});


