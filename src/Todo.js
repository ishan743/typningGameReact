import React, { useState } from "react";
import { connect } from "react-redux";
import { addTask, removeTask, completeTask } from "./action";

const TodoList = ({ tasks, addTask, removeTask, completeTask }) => {
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    addTask(taskInput);
    setTaskInput("");
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Enter task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span className={task.completed ? "completed" : ""}>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>Remove</button>
            {!task.completed && (
              <button onClick={() => completeTask(task.id)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { tasks: state.tasks };
};

export default connect(mapStateToProps, { addTask, removeTask, completeTask })(TodoList);
