import User from '../../../models/user';

const util = require('util');
const bcrypt = require('bcrypt');

//register a new user
async function registerUser(req, res) {
    //hash password
    let salt = await util.promisify(bcrypt.genSalt)(10);
    let hashedPassword = await util.promisify(bcrypt.hash)(req.params.password, salt);

    let registeredUser = new User({
        name: req.params.name,
        email: req.params.email,
        password: hashedPassword
    });

    await registeredUser.save();  

    Object.assign(req.scope, {user:registeredUser});
    req.message = `Successfully registered user ${registeredUser.name}, please check your email for the verification code`;
}

export default registerUser;