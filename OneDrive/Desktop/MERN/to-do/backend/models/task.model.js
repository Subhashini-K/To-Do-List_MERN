const mongoose = require("mongoose");


//Database schema
const taskSchema = new mongoose.Schema(
    {
        id:{type:String,require:true,unique:true},
        name:{type:String,require:true},
        isCompleted:{type:Boolean,require:true}
    }
);

//Model
const Task = mongoose.model("Task",taskSchema);

module.exports = Task;