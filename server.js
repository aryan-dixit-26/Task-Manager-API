import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import express, { json } from "express";
import tasks from "./routes/tasks.js";
import notFound from './middleware/notFound.js'
import errorHandler from "./middleware/error-handler.js";
const app = express();
const port = process.env.PORT || 3000;
dotenv.config({path : './routes/.env'})

//middleware
app.use(json()); //  If we don't use this we won't have that data in req.body



//routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);



// We want to start the server only when the database is connected otherwise it will make no sense.
// This is the reason we create the start function and connect to database inside it.
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server Running at Port : ${port}`);
    })
  } catch (error) {
    console.log(error)
  }
};

start()