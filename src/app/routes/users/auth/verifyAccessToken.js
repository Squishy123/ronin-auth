import validateAccessToken from '../../../middlewares/auth/validateAccessToken';
import verifyAccessToken from '../../../middlewares/auth/verifyAccessToken';

const VerifyAccessToken = {
    method: "POST",
    path: "/user/verify/accesstoken",
    handler: [validateAccessToken, verifyAccessToken, (req, res) => {
        console.log(req.scope);
    }]
}

export default VerifyAccessToken;