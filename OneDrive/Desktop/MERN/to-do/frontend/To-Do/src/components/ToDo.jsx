import React, { useEffect, useRef, useState } from "react";
import "./ToDo.css";
import TodoList from "./TodoList";
import add from "../assets/add.png";

const ToDo = () => {
  //   const [todoList, setTodoList] = useState(localStorage.getItem("todos")?
  // JSON.parse(localStorage.getItem("todos")):[]);
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef();

  // # function to add task
  const addTask = async () => {
    const inputText = inputRef.current.value.trim();

    //if input field empty, return nothing
    if (inputText === "") {
      alert("Input is empty - Please enter a task");
      return null;
    }

    //object for each specific task
    const newTodo = {
      name: inputText,
      isCompleted: false,
    };

    //add task - DB
    try {
      const response = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      //assigning id from backend to frontend as we delete with id
      const data = await response.json();
      newTodo.id = data.id;
      //using set function to update todoList
      setTodoList((prev) => [...prev, newTodo]);
      //clear input field
      inputRef.current.value = "";
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // # function to delete task in db
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "DELETE",
      });
      setTodoList((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  //# function to toggle task
  const toggle = async(id) => {
    const task = todoList.find((todo) => todo.id === id);
    try {
      const response = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: !task.isCompleted }),
      });
    setTodoList((prvTodos) => {
      return prvTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    });
  }
  catch (error) {
    console.error("Failed to toggle task:", error);
  }
  };

  //get tasks from DB on initial render

  useEffect(() => {
    // console.log(todoList);
    //to store tasks in browser so that even if i refresh the page my tasks are saved
    // localStorage.setItem("todos",JSON.stringify(todoList))

    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/task");
        const data = await response.json();
        setTodoList(data); // Populate todoList with tasks from the backend
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="to-do-container">
      {/* title */}
      <div className="title">
        <h1>TO-DO</h1>
      </div>

      {/* input */}
      <div className="input">
        <input ref={inputRef} type="text" placeholder="Add a task" />
        <img onClick={addTask} src={add} alt="add" height="50px" width="50px" />
      </div>

      {/* To-Do list component */}
      <div className="task-container">
        {todoList.map((item, index) => {
          return (
            <TodoList
              key={index}
              task={item.name}
              id={item.id}
              isCompleted={item.isCompleted}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ToDo;
