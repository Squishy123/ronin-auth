import validateVerificationToken from "../../../middlewares/auth/register/validateVerificationToken";
import verifyVerificationToken from "../../../middlewares/auth/register/verifyVerificationToken"

const VerifyUser = {
    method: "GET",
    path: "/user/verify/verificationtoken",
    handler: [validateVerificationToken, verifyVerificationToken]
}

export default VerifyUser;