import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../model/User";

export default class UserController {
    public static async GetAllUsers(req: Request, res: Response) {
        try {
            const users = await User.find();
            res.status(200).json(users)
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    public static async SignUp(req: Request, res: Response) {
        const { phone, name, password } = req.body
        const existedUser = await User.findOne({ phone })
        if (existedUser) {
            res.status(400).json({ message: "Phone is existed" })
        }
        else {
            try {
                const newUser = await User.create({ phone, password, name, })
                await newUser.save()
                res.status(201).json(`Sign Up ${phone} Successfully!`)
            }
            catch (err) {
                console.log(err.message)
                res.status(400).json({ error: err.message });
            }
        }

    }
    public static async SignIn(req: Request, res: Response) {
        try {
            const { password, phone } = req.body
            if (!password || !phone) {
                return res.status(400).json("Phone or password is require!")
            }
            const user: any = await User.findOne({ phone })
            if (!user || user.comparePassword(password)) {
                return res.status(400).json("Phone or password is not correct!")
            }
            const userId = user._id;
            const token = jwt.sign({
                id: userId, phone: phone
            }, process.env.KEY_JWT || "ABC",
                { expiresIn: 60 * 60 * 4 }
            )
            return res.status(200).json({ token, userId })
        }
        catch (err) {
            console.log(err.message)
            res.status(400).json({ error: err.message });
        }

    }
}