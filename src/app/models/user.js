
import mongoose from 'mongoose';

//Defined Schema
const Schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    is_verified: Boolean,
    access_tokens: [],
    verification_token: { type: mongoose.Schema.Types.ObjectId, ref: "Token" },
    reset_token: { type: mongoose.Schema.Types.ObjectId, ref: "Token" },
    transfer_token: { type: mongoose.Schema.Types.ObjectId, ref: "Token" },
});

let User = mongoose.model('User', Schema);

//Model Functions
User.getAll = () => User.find({});

export default User;