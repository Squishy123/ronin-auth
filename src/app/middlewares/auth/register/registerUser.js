const User = require('../../../models/user');

//register a new user
async function registerUser(req, res) {
    let registeredUser = new User({
        ...params
    });

    await registerUser.save();  

    Object.assign(req.scope, {user:registeredUser});
    req.message = `Successfully registered user ${registeredUser.getUsername()}, please check your email for the verification code`;
}

export default registerUser;