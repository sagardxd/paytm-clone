const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const { User } = require('../models/db')
const { Account} = require('../models/account')
const z = require('zod')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const authMiddleware = require("../middleware")

const signupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string(),
})

const updateInfoBody = z.object({
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
})


//signUp
router.post('/signup', async (req, res) => {

    //zod vaildation    
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    //checking if the user exists in the db
    const exsistingUser = await User.findOne({
        username: req.body.username
    })
    if (exsistingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    //creating a user
    const user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    })
    const userId = user._id;

    //intializing balance
    const accBalance = 1 + Math.random() * 10000 
    const userAcc = await Account.create({
        userId,
        balance :accBalance
    })

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        balance: accBalance,
        token: token
    })
})

//signIn
router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (!user) {
        return res.status(411).json({
            message: "Error while logging in",
        })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res.json({
        message: "Login successfull",
        token: token
    })
})

//update the user information
router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateInfoBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.findByIdAndUpdate({ _id: req.userId }, req.body);

    return res.json({
        message: "updated successfully"
    })
})

//to filter and get users
router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter,
                "$options": "i"
            }
        }, {
            lastname: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;