const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

//register a new user
async function registerUser(req, res) {
    let attributes = ["email", "name"]
    attributes = attributes.map((a) =>
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: a, Value: req.params[a] })
    );

    let registeredUser = await new Promise((resolve, reject) => {
        this.binds.cognitoData.userPool.signUp(req.params.username,
            req.params.password,
            attributes,
            null, (err, result) => {
                if (err)
                    reject(err);

                resolve(result.user);
            })
    });

    Object.assign(req.payload, registeredUser);
    req.message = `Successfully registered user ${registeredUser.getUsername()}, please check your email for the verification code`;
}

export default registerUser;