
import mongoose from 'mongoose';

//Defined Schema
const Schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    is_verified: Boolean,
    access_tokens: [],
    verification_token: mongoose.Schema.Types.ObjectId,
    reset_token: mongoose.Schema.Types.ObjectId,
    transfer_token: mongoose.Schema.Types.ObjectId
});

let User = mongoose.model('User', Schema);

//Model Functions
User.getAll = () => User.find({});

export default User;