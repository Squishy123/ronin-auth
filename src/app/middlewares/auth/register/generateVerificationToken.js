import Token from '../../../models/token';

async function generateVerificationToken (req, res) {
    let token = await Token.createVerificationToken(req.scope.user);

    Object.assign(req.payload, {verification_token: token.token}); 
}

export default generateVerificationToken;