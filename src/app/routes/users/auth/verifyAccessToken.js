import validateAccessToken from '../../../middlewares/auth/general/validateAccessToken';
import verifyAccessToken from '../../../middlewares/auth/general/verifyAccessToken';

const VerifyAccessToken = {
    method: "POST",
    path: "/user/verify/accesstoken",
    handler: [validateAccessToken, verifyAccessToken, (req, res) => {
        console.log(req.scope);
    }]
}

export default VerifyAccessToken;