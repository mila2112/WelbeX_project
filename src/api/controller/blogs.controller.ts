import { Response, Request } from "express";
import BlogRepository from "../repositories/blog.repository";
import { models } from "../../db";

class BlogsController {
    public blogRepository: BlogRepository;
    private model: any;

    constructor(blogRepository) {
        this.model = models.Blogs;
        this.blogRepository = blogRepository;
    }

    createBlogs = async (req: Request & { payload: { id: number } }, res: Response) => {
        try {
            const { id } = req.payload;
            const { text } = req.body;
            const blog = await this.blogRepository.create({
              text,
              userId:id,
            });
            return res.send({message:"You have successfully create blog!", blog: blog});
        } catch (err) {
            console.log("err", err);
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };

    list = async (req, res) => {
        try {
            const { list_size = 20, page = 1 } = req.query;
            const limit = list_size;
            const offset = (page - 1) * list_size;

            const list = await this.model.findAndCountAll({
                limit,
                offset,
            });

            res.status(200).send(list);
        } catch (e) {
            res.status(400).send("Something went wrong");
        }
    };

    updateBlogs = async (req: Request & { payload: { id: number } }, res: Response) => {
        try {
            const { id } = req.payload;
            const { text } = req.body;
            await this.blogRepository.update({ userId:id },{ text });
            return res.send("You have successfully update blog!");
        } catch (err) {
            console.log("err", err);
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };

    deleteBlog = async (req:Request &  { payload: { id: number } }, res:Response) => {
        try{
            const { id } = req.payload;
            const { blogId } = req.body;
            await this.blogRepository.update({ userId:id, id:blogId }, { deleted:true });
            return res.send("You have successfully delete blog!");
        } catch (err) {
            console.log("err", err);
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    }
}

export default BlogsController;
