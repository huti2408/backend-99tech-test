import { Express, Request, Response } from "express";
import UserRoute from "./UserRoute"
import BlogRoute from "./BlogRoute"



const router = (app: Express) => {
    app.get("/", (req: Request, res: Response) => {
        res.send(`<center><h1>Hello World, Welcome!!</h1></center>`)
    })
    app.use("/users", UserRoute)
    app.use("/blogs", BlogRoute)
}

export default router;