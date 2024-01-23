import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
})

const USER = mongoose.model('User', userSchema);

module.exports = USER;