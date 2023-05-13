import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userRouter } from "./api/routes/users";
import { blogRouter } from "./api/routes/blogs";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.listen(process.env.APP_PORT);

export { app };
