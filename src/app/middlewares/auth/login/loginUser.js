const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

//logins a user given login credentials
async function loginUser(req, res) {
  let authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: req.params.username || req.params.email,
    Password: req.params.password
  });

  let userData = {
    Username: req.params.username || req.params.email,
    Pool: this.binds.cognitoData.userPool
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  let loginRes = await new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: result =>
        resolve({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken()
        }),
      onFailure: reject
    });
  });

  Object.assign(req.payload, loginRes);
  req.message = "Success: Successfully Logged in User";
}

export default loginUser;
