import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
  login,
  logout,
  refresh,
  register,
  getCurrentUser,
} from "../controllers/userController.js";



const router = Router();

router.route("/refresh").get(refresh)
router.route("/register").post(register)
router.route("/login").post(login)


// secure route
router.route("/logout").post(verifyJWT, logout);
router.route("/getCurrentUser").post(verifyJWT, getCurrentUser);



export default router;
