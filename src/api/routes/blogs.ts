import * as express from "express";
const blogRouter = express.Router();
import db from "../../db/models"
import BlogsRepository from "../repositories/blog.repository";
import BlogsController from "../controller/blogs.controller";
import auth from "../middleweares/authentication.middlewear";

const blogRepository = new BlogsRepository(db.Blogs);

const blog = new BlogsController(blogRepository);

const { authenticate } = auth;

blogRouter.get("/list", blog.list);

blogRouter.use(authenticate);
blogRouter.post("/create", blog.createBlogs);
blogRouter.put("/update", blog.updateBlogs);
blogRouter.delete("/delete", blog.deleteBlog);

export { blogRouter };
