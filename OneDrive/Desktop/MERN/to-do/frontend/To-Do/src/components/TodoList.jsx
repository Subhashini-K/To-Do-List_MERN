import React from "react";
import del from "../assets/delete.png";
import "./TodoList.css";
import complete from "../assets/complete.png"
import incomplete from "../assets/incomplete.png"

const TodoList = ({ task ,id, isCompleted, deleteTodo, toggle }) => {
  return (
    <div className="taskComponent">
      <div className="taskhistory">
       <img src={isCompleted?complete:incomplete} onClick={()=>{toggle(id)}} alt="complete" height="30px" width="30px" />
        <div onClick={()=>{toggle(id)}} className="task">
          <p style={isCompleted?{textDecoration:"line-through"}:{}}>{task}</p>
        </div>
      </div> 
      <div className="remove">
        <img  onClick={()=> deleteTodo(id)} src={del} alt="delete" />
      </div>
    </div>
  );
};

export default TodoList;
