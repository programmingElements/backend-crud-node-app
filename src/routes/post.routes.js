import { Router } from "express";

import { createPost,updatePost, getAllPost, deletePost } from "../controllers/post.controllers.js";

const router = Router();

router.route("/").
post(createPost)
.get(getAllPost);

router.route("/:id")
.put(updatePost)
.delete(deletePost);


export default router;
