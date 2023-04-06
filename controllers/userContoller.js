import User from "../models/user.js";


//signup function
export const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;


    //validation that, is there any missing field in any of the required data.
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }

    //if user is already existing then no need to signup with same details again.
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }
  
    //save new user in our database
    const user = new User({ username, email, password});
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Signup successfully!!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Signup error please try again!!",
      success: false,
      error,
    });
  }
};

// get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "Sending Users to client",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in sending user details",
      error,
    });
  }
};


//login function

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation that ,is any of the required field is missing we do not login in the blogger
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    //finding the user with coming email from client in our database.
    const user = await User.findOne({ email });

  // if user with give email does not exist this mean user is valid
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User is not register,please signup!!",
      });
    }


    //if user email is valid that it is found in our database then we check the password is matching with our save password in database
    //const isMatch = await bcrypt.compare(password, user.password);

    if (user.password!=password) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }

    //if user email and paswword is matches then user can succesfully login !!.
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while login in Blogger",
      error,
    });
  }
};
