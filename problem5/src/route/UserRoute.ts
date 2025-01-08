import { Router } from "express"
import UserController from "../controller/UserController"
import Authentication from "../middleware/Authentication";

const router = Router();
router.get("/", UserController.GetAllUsers)
router.post("/signin", UserController.SignIn)
router.post("/signup", UserController.SignUp)

export default router;