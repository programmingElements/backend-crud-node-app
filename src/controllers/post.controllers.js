import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.models.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  // check post already exists
  const post = await Post.findOne({ title: title });
  console.log(post);
  if (post) {
    throw new ApiError(400, "Post Already Exists");
  }

  const newPost = await Post.create({
    title: title,
    body: body,
  });

  if (!newPost) {
    throw new ApiError(400, "Post Creation Failed!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newPost, "Post Created Successfully!"));
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "No Post Found!");
  }

  const updatePost = await Post.findByIdAndUpdate(
    id,
    {
      $set: {
        title: title,
        body: body,
      },
    },
    {
      new: true,
    }
  );

  if (!updatePost) {
    throw new ApiError(400, "Post Updation Failed !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatePost, "Post Updated Successfully!"));
});

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Got All Posts Successfully!"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(400, "No Post Found!");
  }

  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    throw new ApiError(400, "Post Deletion Failed!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post Deleted Successfully!"));
});

export { createPost, updatePost, getAllPost, deletePost };
