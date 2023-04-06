import mongoose from "mongoose";
import Blog from "../models/blog.js"
import User from "../models/user.js";

//this function created for get request call in blogRoutes.js to get all the blogs save in our database.
export const getBlogs = async (req, res) => {
  try {
    //find all the blogs in database using find function on mongodb and then storing them in blogs
    const blogs = await Blog.find({}).populate("user");

    //if our blog array is empty that means nno blog is posted yet so we saif no blogs found in the database
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }

    //else we send the whatever blogs we find in our database
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs lists",
      blogs,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting Blogs",
      error,
    });
  }
};

//this function is created for post api call when user want to create new blog all the detalis it gives is come here and save in our database so that in future user can retrieve the created blog.
export const createBlog = async (req, res) => {
  try {

    //here we store all the details coming in req body
    const { title, description, image, user } = req.body;

    //validation,basically here we validate that none of the required thing is empty if any field is empty then we do not execute the request successfully.
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }

    //if all requirement are fullfiled then we find the valid user if it exist in our database
    const userexist = await User.findById(user);

    //validaton,if we are unable to find user it means there is somethinng wrong user details is not save in our dattabase so we can not save the blog created by user in our database
    if (!userexist) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
//else if everything is fine so userexist is true that means we find the user in our database who created new blog so on its id we have to save post in our database.
    const newBlog = new Blog({ title, description, image, user });

// creating a new blog and saving it to the database, and then adding the blog to the user's blogs array and saving the user.
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    userexist.blogs.push(newBlog);
    await userexist.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creting blog",
      error,
    });
  }
};





//  export const updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, image } = req.body;
//     const blog = await Blog.findByIdAndUpdate(
//       id,
//       { ...req.body },
//       { new: true }
//     );
//     return res.status(200).send({
//       success: true,
//       message: "Blog Updated!",
//       blog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "Error While Updating Blog",
//       error,
//     });
//   }
// };

//this function is for updating a blog in the database.
export const updateBlog = async (req, res) => {


  try {

    //Took the id of the blog from the request parameters 
    const { id } = req.params;

    //takes title, description, and image of the blog from the request body.
    const { title, description, image } = req.body;

    // Uses the Mongoose findByIdAndUpdate function to find the blog by its id and update its properties with the values from the request body.
    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

   // If the update is successful, it returns a response with a status code of 200 and a JSON object containing a success boolean value, a message string, and the updated blog object.
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  }
  
  catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Blog",
      error,
    });
  }
};

//this function is GET request to retrieve a single blog post.
export const getOne = async (req, res) => {


  try {

    // first extracting the id parameter from the req URL using req.params
    const { id } = req.params;

  //uses the above id to search for the blog post in the database using the Mongoose findById function.  
    const blog = await Blog.findById(id);

  //if no blog is find in our database with given id then returns status code 404   
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "No blog is found with this id",
      });
    }

  //else if blog is found in our database then we send status code 200  
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
      error,
    });
  }
};

//function that deletes a blog post from the database.
export const deleteBlog = async (req, res) => {

  //finding the blog in our database using mongodb findByIdAndDelete function and getting id from req.params
  try {
// The populate method is used to retrieve the associated user data with the blog post, so that its blogs array can be updated.
    const blog = await Blog.findByIdAndDelete(req.params.id).populate("user");

    // the pull method is used to remove the deleted blog post from the blogs array of the associated user data.the save method is used to save the changes to the user document.
    await blog.user.blogs.pull(blog);

    //the save method is used to save the changes to the user document.
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog is deleted successfully from the database!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr is occur while deleting the blog post from database",
      error,
    });
  }
};

//function that retrieves all the blogs associated with any given user.
export const Myblog = async (req, res) => {
  try {

//the findById() method to retrieve the user object with the given ID
//then populates the blogs field of that object with the associated Blog documents.
    const userBlog = await User.findById(req.params.id).populate("blogs");

 //If the user is not found, it sends a 404 response   
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
 //else it sends a 200 response   
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};
