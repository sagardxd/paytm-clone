const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors')
const routeRouter = require("./routes/index");
const userRouter = require('./routes/user')
const app = express();

//mongoDb
mongoose.connect('mongodb://0.0.0.0:27017/paytm')
.then(() => console.log("Mongodb connected"));

app.use(cors());
app.use(express.json());
app.use("/api/v1", routeRouter);
app.use("/api/v1/user", userRouter);


app.listen(6000, () => {console.log("Port started at 6000")});


