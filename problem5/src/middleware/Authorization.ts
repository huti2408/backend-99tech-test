import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

export default async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1] || "";
    if (!token) return res.status(401).send({ message: "Invalid token" })
    try {
        const userInfo = jwt.verify(token, process.env.KEY_JWT || "abc")
        req.user = userInfo
        next();
    }
    catch (err) {
        console.error(err)
        res.status(401).json(err);
        return;
    }
}