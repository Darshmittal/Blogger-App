//importing packages
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

//initializing dotenv.
dotenv.config();



//establishing the mongodb connection.
Connection();

//creating instance of express by name app.
const app = express();

//middelwares
//cors for cross-origin resource sharing, like from fronted to backend post 3000 to 8080;
app.use(cors());
// to parse request bodies in JSON format
app.use(express.json());
// logging HTTP requests to the console.
app.use(morgan("dev"));


//Mounting the userRoutes and blogRoutes modules.These two routes are responsible for handeling user and blog related requests.
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);


const PORT=8080;
app.listen(PORT, () => {
  console.log(
    `Server Running on mode port no ${PORT} successfully.`
  );
});
