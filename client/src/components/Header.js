//this is a header component of our blogger app.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box,AppBar,Toolbar,Button,Tabs,Tab,styled} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";


const Component = styled(AppBar)`
  background: #212121;
  color: white;
`;

const Container = styled(Toolbar)`
  justify-content: space-between;
  & > a {
    color: white;
    font-size: 24px;
    text-decoration: none;
    margin-right: 24px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #f57c00;
  color: white;
  height: 48px;
  border-radius: 2px;
  font-size: 16px;
  margin-left: 16px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #f57c00;
  color: white;
  height: 48px;
  border-radius: 2px;
  font-size: 16px;
  margin-left: 16px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Header = () => {
//the header component uses the useSelector hook from Redux to retrieve the isLogin state variable from the store.
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Component position="sticky">
        <Container>
          <Link to="/">Blogger</Link>
          {isLogin && (
            <Box display={"flex"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Publish Blog"LinkComponent={Link}to="/create-blog"/>
              </Tabs>
            </Box>
          )}
          <Box display={"flex"}>
            {!isLogin && (
              <>
                <LoginButton
                  sx={{ color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </LoginButton>

                <SignupButton
                  sx={{ color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Signup
                </SignupButton>
              </>
            )}
            {isLogin && (
              <LoginButton onClick={handleLogout} sx={{ color: "white" }}>
                Logout
              </LoginButton>
            )}
          </Box>
        </Container>
      </Component>
    </>
  );
};

export default Header;
