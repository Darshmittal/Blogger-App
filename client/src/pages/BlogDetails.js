//component which is render when user want to update the blog post.

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {

  const [blog, setBlog] = useState({});

//componenet uses useParams hooks to get the blog post id from the url. 
  const id = useParams().id;
//uses navigate hook to navigate to another page after updating the blog post.  
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  // get blog details

//function makes a GET request to get the details of the blog post with the ID from the URL.  
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
   // sets the state of the blog post     
        setBlog(data?.blog);
   //sets the input fields to the recieved data.     
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  },[id]);


 // updates the state of the input fields whenever a change event is triggered on any of the input fields. 
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //this function is triggered when the form is submitted.
  const handleSubmit = async (e) => {

  //makes the put request to backend to update the blog post with the ID from the urland new data from the input fields.  
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blog);

  //component returns a form with input fields for the title, description, and image of the blog post, as well as a submit button.  
  return (
    <v>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          > 
            Update Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
    </v>
  );
};

export default BlogDetails;