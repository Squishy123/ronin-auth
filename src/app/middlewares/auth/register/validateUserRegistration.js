const User = require('../../../models/user');

/**
 * Validation of user registration
 * username - required
 * name - required
 * email - required
 * password -required
 */
async function validateUserRegistration(req, res) {
    let queries = ["username", "name", "email", "password"];

    let missing = queries.filter((q) => {
        if (!req.params[q])
            return q;
    });

    if (missing.length)
        return new Error(`Error: Missing required parameters: ${missing}`);

    let user = await User.find({
        email,
    });

    if(user)
        return new Error(`Error: User with given email already registered`);

}

export default validateUserRegistration;