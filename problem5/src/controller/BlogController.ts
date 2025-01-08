import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import Blog from "../model/Blog";
import { TypeResponse } from "../type/common";
import User from "../model/User";

export default class BlogController {
    public static async GetAllBlogs(req: any, res: Response) {
        const blogsResponse: TypeResponse = {
            data: null,
            errorCode: "00",
            message: "Get all blogs successfully"
        }
        try {
            const { page = 1, limit = 10, active = true, title, authorPhone } = req.query;
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);
            const skip = (pageNumber - 1) * limitNumber;

            const filter: any = { active, deleted: false }
            if (title) {
                filter.title = { $regex: title, $options: 'i' };
            }
            if (authorPhone) {
                filter.author.phone = authorPhone
            }
            const blogs = await Blog.find(filter)
                .limit(limitNumber)
                .skip(skip);
            const totalBlogs = await Blog.countDocuments(filter);
            blogsResponse.data = { blogs, page, limit, totalItems: totalBlogs }
            res.status(200).json(blogsResponse)
            return
        }
        catch (error) {
            console.log(error.message)
            blogsResponse.message = error.message
            blogsResponse.errorCode = "99"
            res.status(400).json({ error: error.message });
            return
        }
    }

    public static async GetDetailBlog(req: any, res: Response) {
        const { id } = req.params;
        const blogResponse: TypeResponse = {
            data: null,
            errorCode: "00",
            message: "Get detail successfully"
        }
        try {
            const blog = await Blog.findOne({ _id: id, deleted: false })
            if (!blog) {
                blogResponse.message = "Blog not found"
                blogResponse.errorCode = "01"
                res.status(400).json(blogResponse)
                return
            }
            blogResponse.data = blog

            res.status(200).json(blogResponse)
        } catch (error) {
            console.log(error.message)
            blogResponse.message = error.message
            blogResponse.errorCode = "99"
            res.status(400).json(blogResponse);
            return
        }


    }

    public static async CreateBlog(req: any, res: Response) {
        const blogResponse: TypeResponse = {
            data: null,
            errorCode: "00",
            message: "Create blog successfully"
        }
        try {
            const { phone } = req.user
            const { title, shortContent = null, fullContent } = req.body
            const user = await User.findOne({ phone })
            if (!user) {
                blogResponse.message = "Something was wrong, please try again later"
                blogResponse.errorCode = "02"
                res.status(400).json(blogResponse)
                return
            }
            const blog = await Blog.create({ title, shortContent, fullContent, author: user })
            await blog.save()
            blogResponse.data = blog
            res.status(200).json(blogResponse)
            return
        }
        catch (err) {
            console.log(err.message)
            blogResponse.message = "Failed to create blog"
            blogResponse.errorCode = "99"
            res.status(400).json(blogResponse);
            return
        }
    }

    public static async UpdateBlog(req: any, res: Response) {
        const blogResponse: TypeResponse = {
            data: null,
            errorCode: "00",
            message: "Update blog successfully"
        }
        try {
            const { userId } = req.user
            const { id } = req.params;
            const blog = await Blog.findOneAndUpdate({ 'author': userId, _id: id, deleted: false }, req.body)
            if (!blog) {
                blogResponse.message = "Something was wrong, please try again later"
                blogResponse.errorCode = "03"
                res.status(400).json(blogResponse)
                return
            }
            await blog.save()
            blogResponse.data = blog
            res.status(200).json(blogResponse)
            return
        }
        catch (err) {
            console.log(err.message)
            blogResponse.message = "Failed to update blog"
            blogResponse.errorCode = "99"
            res.status(400).json(blogResponse);
            return
        }

    }

    public static async DeleteBlog(req: any, res: Response) {
        const blogResponse: TypeResponse = {
            data: null,
            errorCode: "00",
            message: "Delete blog successfully"
        }
        try {
            const { userId } = req.user
            const { id } = req.params;
            const blog = await Blog.findOneAndUpdate({ 'author': userId, _id: id }, { deleted: true })
            if (!blog) {
                blogResponse.message = "Something was wrong, please try again later"
                blogResponse.errorCode = "04"
                res.status(400).json(blogResponse)
                return
            }
            await blog.save()
            blogResponse.data = blog
            res.status(200).json(blogResponse)
            return
        }
        catch (err) {
            console.log(err.message)
            blogResponse.message = "Failed to delete blog"
            blogResponse.errorCode = "99"
            res.status(400).json(blogResponse);
            return
        }

    }
}