import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../model/User";
import { TypeResponse } from "../type/common";

export default class UserController {
    public static async GetAllUsers(req: Request, res: Response) {
        try {
            const users = await User.find();
            const usersResponse: TypeResponse = {
                data: users,
                errorCode: "00",
                message: "Get all users successfully"
            }
            res.status(200).json(usersResponse)
            return
        }
        catch (err) {
            res.status(400).json({ error: err.message });
            return
        }
    }

    public static async SignUp(req: Request, res: Response) {
        const { phone, name, password } = req.body
        const existedUser = await User.findOne({ phone })
        const usersResponse: TypeResponse = {
            data: null,
            errorCode: "00",
            message: "Sign up successfully"
        }
        if (existedUser) {
            usersResponse.message = "Phone is existed"
            usersResponse.errorCode = "10"
            res.status(400).json(usersResponse)
            return
        }
        else {
            try {
                const newUser = await User.create({ phone, password, name, })
                await newUser.save()
                usersResponse.data = { phone }
                res.status(201).json(usersResponse)
                return
            }
            catch (err) {
                usersResponse.message = err.message
                usersResponse.errorCode = "99"
                res.status(400).json(usersResponse);
                return
            }
        }

    }

    public static async SignIn(req: Request, res: Response) {
        const signInResponse: TypeResponse = {
            data: null,
            errorCode: "00",
            message: "Sign in successfully"
        }
        try {
            const { password, phone } = req.body
            if (!password || !phone) {
                signInResponse.message = "Phone or password is not correct!"
                signInResponse.errorCode = "11"
                res.status(400).json(signInResponse)
                return
            }
            const user: any = await User.findOne({ phone })
            const isCorrectPassword = await user.comparePassword(password)
            if (!user || !isCorrectPassword) {
                signInResponse.message = "Phone or password is not correct!"
                signInResponse.errorCode = "11"
                res.status(400).json(signInResponse)
                return
            }
            const userId = user._id;
            const token = jwt.sign({
                userId: userId, phone: phone
            }, process.env.KEY_JWT || "ABC",
                { expiresIn: 60 * 60 * 4 }
            )
            signInResponse.data = { token, userId }
            res.status(200).json(signInResponse)
            return
        }
        catch (err) {
            signInResponse.message = err.message
            signInResponse.errorCode = "99"
            res.status(400).json(signInResponse);
            return
        }

    }
}