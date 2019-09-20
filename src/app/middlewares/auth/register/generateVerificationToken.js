const util = require('util');
const bcrypt = require('bcrypt');

async function generateVerificationToken (req, res) {
    console.log(req.scope.user);

    //Middleware
    let salt = await util.promisify(bcrypt.genSalt)(10);
    let hash = await util.promisify(bcrypt.hash)(req.scope.user.email, salt);
    
    req.scope.user.verification_token = hash;
    await req.scope.user.save();

    Object.assign(req.payload, {verification_token: hash}); 
}

export default generateVerificationToken;