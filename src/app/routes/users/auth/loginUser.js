import validateUserLogin from "../../../middlewares/auth/validateUserLogin";
import loginUser from "../../../middlewares/auth/loginUser";

const LoginUser = {
  method: "POST",
  path: "/user/login",
  handler: [validateUserLogin, loginUser]
};

export default LoginUser;
