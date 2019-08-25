/**
 * Validation of user registration
 * username - required
 * name - required
 * email - required
 * password -required
 */
function validateUserRegistration(req, res) {
    let queries = ["username", "name", "email", "password"];

    let missing = queries.filter((q) => {
        if (!req.params[q])
            return q;
    });

    if (missing.length)
        return new Error(`Error: Missing required parameters: ${missing}`);

}

export default validateUserRegistration;