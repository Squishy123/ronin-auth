/**
 * Validation of user login
 * username || email - required
 * password - required
 */
function validateUserLogin(req, res) {
    if (!req.params.password && !req.params.username && !req.params.email)
        return new Error("Error: Missing required parameters username/email and password")


    if (!req.params.password)
        return new Error("Error: Missing required parameter password");


    if (!req.params.username && !req.params.email)
        return new Error("Error: Missing required parameter username or email");

}

export default validateUserLogin;