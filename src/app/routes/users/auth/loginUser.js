import validateUserLogin from "../../../middlewares/auth/login/validateUserLogin";
import loginUser from "../../../middlewares/auth/login/loginUser";

const LoginUser = {
  method: "POST",
  path: "/user/login",
  handler: [validateUserLogin, loginUser]
};

export default LoginUser;
