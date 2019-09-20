const jwt = require('jsonwebtoken');

//check to see if access token is verified
async function verifyAccessToken (req, res) {
    let decoded = jwt.decode(req.params.accessToken, {complete: true});
    let verified;

    //prelim check if accessToken kid matches any keys
    for(let i = 0; i < this.binds.cognitoData.keys.length; i++) {
        if(decoded.header.kid == this.binds.cognitoData.keys[i].kid) {
            verified = await new Promise((res, rej) => {
                jwt.verify(req.params.accessToken, this.binds.cognitoData.keys[i].pem, {
                    algorithms: [this.binds.cognitoData.keys[i].alg]
                }, (err, decodedToken) => {
                    if(err) 
                        rej(err);
                    res(decodedToken);
                })
            }); 
        }
    }

    if(!verified)
        throw new Error("Error: AccessToken is invalid");

    //add verified access token field
    Object.assign(req.scope.verified, {accessToken: true});
}

export default verifyAccessToken;