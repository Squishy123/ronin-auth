
import mongoose from 'mongoose';

const crypto = require('crypto');

//Defined Schema
const Schema = mongoose.Schema({
    type: String,
    user_id: mongoose.Schema.Types.ObjectId,
    token: String,
    created_at: Date,
    expire_at: Date,
    available_uses: Number
});

//run expiry reaper
Schema.index({expire_at: 1}, {expireAfterSeconds: 0});

Schema.statics.createVerificationToken = async function(user) {
    let date = new Date();

    let token = new Token(
        {
            type: 'verification',
            user_id: user._id,
            created_at: date,
            token: crypto.randomBytes(16).toString('hex'),
            expire_at: new Date().setDate(date.getDate() + 7),
            available_uses: 1
        }
    )

    await token.save();

    user.verification_token = token._id;
    await user.save();

    return token;
}

let Token = mongoose.model('Token', Schema);

//Model Functions
Token.getAll = () => Token.find({});

export default Token;