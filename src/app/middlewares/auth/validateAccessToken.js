/**
 * Validation of access token
 * access_token - required
 */
function validateAccessToken (req, res) {
    if(!req.params.accessToken)
        return new Error("Error: Missing required parameter access_token");
}

export default validateAccessToken;