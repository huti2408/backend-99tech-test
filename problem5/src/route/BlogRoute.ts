import { Router } from "express"
import BlogController from "../controller/BlogController"
import Authentication from "../middleware/Authentication";

const router = Router();
router.get("/", BlogController.GetAllBlogs)
router.get("/:id", BlogController.GetDetailBlog)
router.post("/", Authentication, BlogController.CreateBlog)
router.post("/update/:id", Authentication, BlogController.UpdateBlog)
router.post("/delete/:id", Authentication, BlogController.DeleteBlog)

export default router;