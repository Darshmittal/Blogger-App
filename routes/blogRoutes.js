import express from 'express';
import {getBlogs,createBlog,updateBlog,getOne,deleteBlog,Myblog}  from "../controllers/blogControlller.js"

//router object
const router = express.Router();

// route to get all the blogs stored in our database.
router.get("/all-blog", getBlogs);

//route to create a new Blog and then store it in our database.
router.post("/create-blog", createBlog);

//route to update the existing blog post.
router.put("/update-blog/:id", updateBlog);

//route to get the any single blog by using id params.
router.get("/get-blog/:id", getOne);

//route to delete the existing blog from our database.
router.delete("/delete-blog/:id", deleteBlog);

//route to get the blogs array of a particular user by using user id.
router.get("/user-blog/:id", Myblog);

export default router;
