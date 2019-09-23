
function validateVerificationToken (req, res) {
    //Middleware
    if(!req.params.verificationToken) {
        return new Error(`Error: Missing required parameter: verification_token`);
    }
}

export default validateVerificationToken;