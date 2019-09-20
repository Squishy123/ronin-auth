
import mongoose from 'mongoose';

//Defined Schema
const Schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    is_verified: Boolean,
    access_tokens: [],
    verification_token: String,
    reset_token: String,
    transfer_token: String
});

let User = mongoose.model('User', Schema);

//Model Functions
User.getAll = () => User.find({});

export default User;