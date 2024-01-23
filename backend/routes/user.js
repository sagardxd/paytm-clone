const express = require('express')
const router = express.Router();
const { USER } = require('../db')
const zod = require('zod')
const { jwt } = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const {authMiddleware} = require("..middleware/")

const signupBody = zod.object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string().email(),
    password: z.string(),
})

const signinBody = zod.object({
    username: z.string().email(),
    password: z.string(),
})


//signUp
router.post('signiup', async (req, res) => {

//zod vaildation    
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

//checking if the user exists in the db
    const exsistingUser = await USER.findOne({
        username: req.body.username
    })
    if (exsistingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    //creating a user
    const user = await USER.create({
        firstname: req.body.firstName,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    })
    const userId = user._id;
    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

//signIn
router.get("/signin", async(req,res) => {
    const {success} = signinBody.safeParse(req.body)    
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = USER.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if(!user) {
        return res.status(411).json({
            message: "Error while logging in",
        })
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET);
    return  res.json({
        message: "Login successfull",
        token: token
    })

})

//updating user info
router.put("/", authMiddleware, async(req,res) => {
    
})


module.exports = router;