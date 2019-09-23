import User from "../../../models/user";
import Token from "../../../models/token";

async function verifyVerificationToken (req, res) {
    //Middleware
    //get token
    let token = await Token.findOne({token: req.params.verificationToken}).populate('user');
    if(!token) {
        throw new Error("Error: Invalid token");
    }

    //decrease token uses
    if(token.available_uses <= 0)
        throw new Error("Error: Token has already been used")
    
    token.available_uses-=1;
    await token.save();

    token.user.is_verified = true;
    await token.user.save();

    req.message = `Successfully verified user ${token.user.name}`;
}

export default verifyVerificationToken;