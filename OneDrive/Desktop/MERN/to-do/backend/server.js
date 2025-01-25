const express = require("express");
const mongoose = require("mongoose");
const app = express();
const  {createTask,readAllTask,readTaskById,updateTask,deleteTask} = require("./controllers/task.controller")
const cors = require("cors");

app.use(cors());
app.use(express.json());

//mongoose
mongoose
  .connect("mongodb://localhost:27017/to-do")
  .then(() => {
    console.log("connected to database");
    //starting the server
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch(() => {
    console.log("connection failed!");
  });

//routes
app.post("/api/task",createTask);
app.get("/api/task",readAllTask);
app.get("/api/task/:id", readTaskById);
app.put("/api/task/:id", updateTask);
app.delete("/api/task/:id", deleteTask);