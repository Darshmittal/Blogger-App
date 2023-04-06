//functional component that renders a card representing a blog post.
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const BlogCard = React.memo(({ title, description, image, username, time, id, isUser }) => {
  const navigate = useNavigate();

  const handleEdit = React.useCallback(() => {
    navigate(`/blog-details/${id}`);
  }, [id, navigate]);

  const handleDelete = React.useCallback(async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
{/* // The isUser prop is used to check if the current user is the author of the blog post.       */}
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="auto" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="auto" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: red[500],
              width: 50,
              height: 50,
            }}
            aria-label="recipe"
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={username}
        subheader={
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: "bold" }}
          >
            {new Date(time).toLocaleDateString()}
          </Typography>
        }
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default BlogCard;
