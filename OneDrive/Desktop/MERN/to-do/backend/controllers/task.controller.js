const Task = require("../models/task.model");
const { v4: uuidv4 } = require("uuid");

const createTask = async (req, res) => {
    try {
      const { name, isCompleted } = req.body;
      console.log(req.body)
      if (!name) {
       return  res
          .status(400)
          .json({ message: "please provide  task name" });
      }
  
      const newTask = new Task({
        id: uuidv4(),
        name,
        isCompleted,
      });
      const savedTask = await newTask.save();
     return  res.status(201).json(savedTask);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" + " " + error });
    }
  };


  const readAllTask = async (req, res) => {
    try {
      const tasks = await Task.find();
      if (!tasks) {
        return res.status(404).json({ message: "No tasks found" });
      }
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" + " " + error });
    }
  };


  const readTaskById = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ id });
      if (!task) {
        res.status(404).send({ message: "No task found" });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" + " " + error });
    }
  };


  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, isCompleted } = req.body;
      const updatedTask = await Task.findOneAndUpdate(
        { id: id },
        { isCompleted },
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" + " " + error });
    }
  }



  const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findOneAndDelete({ id });
      if (!deletedTask) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.status(200).json(deletedTask);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" + " " + error });
    }
  };

  module.exports = {createTask,readAllTask,readTaskById,updateTask,deleteTask};