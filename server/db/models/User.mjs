import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    wonMatches: {
        type: Number,
        default: 0,
        min: 0,
    },
    loseMatches: {
        type: Number,
        default: 0,
        min: 0,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model("user", userSchema);

export default User;