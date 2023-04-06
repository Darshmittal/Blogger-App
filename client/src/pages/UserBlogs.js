// displays the blogs created by a user

import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";




const UserBlogs = () => {

  const [blogs, setBlogs] = useState([]);

// function is called to get the user's blogs using an HTTP GET request backend where :id is the user ID stored in the localStorage.  
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);

  //if the request is successfull users blog are stored in the blogs state variable.    
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);


  return (
    <div>

  {/* //component conditionally renders the blogs using a ternary operator     */}
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>Publish your passions,your way</h1>
      )}
    </div>
  );
};

export default UserBlogs;
