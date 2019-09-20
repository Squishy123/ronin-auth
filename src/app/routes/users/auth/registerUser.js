import validateUserRegistration from '../../../middlewares/auth/register/validateUserRegistration';
import registerUser from '../../../middlewares/auth/register/registerUser';
import generateVerificationToken from '../../../middlewares/auth/register/generateVerificationToken';

const RegisterUser = {
    method: "POST",
    path: "/user/register",
    handler: [validateUserRegistration, registerUser, generateVerificationToken]
}

export default RegisterUser;