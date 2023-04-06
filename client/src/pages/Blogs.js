
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {

//here i define three state variable using usestate hook.
//blogs is an empty array which will store the fetched blogs from server.  
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

//function to fetch all the blogs from the server
  const getAllBlogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      setError("Error fetching blogs. Please try again later.");
      console.log(error);
    }
    setIsLoading(false);
  };

// useEffect hook is used to make an getAllBlog api call to server once when the component is mounted.
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (

    //renders a container for the blog posts.4
    <div className="blogs-container">
      {/* <h1>All Blogs</h1> */}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="blog-cards-container">
        {blogs &&
          blogs.map((blog) => (
            <BlogCard
              key={blog?._id}
              id={blog?._id}
              isUser={localStorage.getItem("userId") === blog?.user?._id}
              title={blog?.title}
              description={blog?.description}
              image={blog?.image}
              username={blog?.user?.username}
              time={blog.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default Blogs;
