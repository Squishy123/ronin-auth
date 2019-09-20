
import mongoose from 'mongoose';

//Defined Schema
const Schema = mongoose.Schema({
    type: String,
    user_id: mongoose.Schema.Types.ObjectId,
    token: String,
    iat: Date,
    exp: Date,
    available_uses: Number
});

Schema.methods.createVerificationToken

let Token = mongoose.model('Token', Schema);

//Model Functions
Token.getAll = () => Token.find({});

export default Token;