const jwkToPem = require('jwk-to-pem');

//get public and private jwks from cognito and return the pem
async function getJwks({ poolData, poolRegion }) {
    let jwks = await fetch(`https://cognito-idp.${poolRegion}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`)
    .then(res => res.json());
    
    jwks.keys.forEach(e => {
        e.pem = jwkToPem(e);
    });
    
    return jwks;
}

export default getJwks;