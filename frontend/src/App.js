import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8080/tasks");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (newTask.trim() === "") return;

    await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newTask,
        completed: false
      })
    });

    setNewTask("");
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE"
    });

    fetchTasks();
  };

  // Complete task
  const completeTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "PUT"
    });

    fetchTasks();
  };

  return (
  <div className="container">
    <h1>Task Tracker</h1>

    <div className="input-section">
      <input
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button className="add-btn" onClick={addTask}>
        Add
      </button>
    </div>

    {tasks.map((task) => (
      <div className="task-item" key={task.id}>
        <div>
  <strong>{task.name}</strong>

  <span
    className={
      task.completed
        ? "status completed-status"
        : "status pending-status"
    }
  >
    {task.completed ? "Completed" : "Pending"}
  </span>
</div>

        <div className="button-group">
          <button
            className="complete-btn"
            onClick={() => completeTask(task.id)}
          >
            Complete
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
}

export default App;