const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const z = require('zod')
const authMiddleware = require('../middleware');
const { Account } = require('../models/account');

const transferBody = z.object({
    to: z.string(),
    amount: z.number()
})

//to get balance
router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

//to transfer funds to another account
router.post("/transfer", authMiddleware, async (req, res) => {
    const { success } = transferBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "invalid inputs"
        })
    }
    const { to, amount } = req.body;

    //starting the session
    const session = await mongoose.startSession();
    session.startTransaction();

    //the user sending the money
    const sender = await Account.findOne({ userId: req.userId })
    if (!sender && sender.balance < amount) {
        session.abortTransaction();
        return res.status(400).json({
            message: "Not enough funds"
        })
    }
    //receiver
    const receiver = await Account.findOne({ userId: to });
    if (!receiver) {
        session.abortTransaction();
        return res.status(400).json({
            message: "No such account available"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    await session.commitTransaction();
    await session.endSession();

    return res.status(200).json({
        message: "Money transfered successfully nigga"
    });
})


module.exports = router;