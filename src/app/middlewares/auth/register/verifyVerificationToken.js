import User from "../../../models/user";
import Token from "../../../models/token";

function verifyVerificationToken (req, res) {
    //Middleware
    //get token
    let token = await Token.find({token: req.params.verificationToken});
    if(!token) {
        throw new Error("Error: Invalid token");
    }
}

export default verifyVerificationToken;