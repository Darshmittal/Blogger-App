//component for a login form
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, styled } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Image = styled('img')({
  width: '50%',
  maxWidth: 200,
  display: 'block',
  margin: 'auto',
  marginTop: 30,
  borderRadius: 10,
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
});

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const Login = () => {



  const navigate = useNavigate();
  //dispatching actions to the Redux store
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

 //makes a POST request to a login endpoint with the user's email and password.     
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });      

// request is successful and the response contains a success property.
      if (data.success) {

    // sets the user ID in the local storage    
        localStorage.setItem("userId", data?.user._id);

 //dispatches a login action to the Redux store       
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

  {/* // renders a form with two input fields for email and password, and a "Login" button to submit the form   */}
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Image src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt=""/>
          <Typography
            variant="standard"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <LoginButton
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Login
          </LoginButton>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;

