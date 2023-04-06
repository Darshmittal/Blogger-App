import express from 'express';
import {getUsers,Signup,Login} from '../controllers/userContoller.js';

//router object
const router = express.Router();

//route to get all the user stored in our database.
router.get("/all-users", getUsers);

//route to signup new user in blogger application.
router.post("/register", Signup);

//route to login the user in blogger application.
router.post("/login", Login);

export default router;
