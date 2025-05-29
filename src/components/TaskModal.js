import React, { useState, useEffect } from "react";

const TaskModal = ({ isOpen, onClose, onSave, existingTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");

  useEffect(() => {
    if (existingTask) {
      setTaskTitle(existingTask.title);
      setTaskDescription(existingTask.description);
      setTaskPriority(existingTask.priority);
    } else {
      setTaskTitle("");
      setTaskDescription("");
      setTaskPriority("Low");
    }
  }, [existingTask]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!taskTitle.trim()) {
      alert("Task title is required.");
      return;
    }

    const taskData = {
      id: existingTask?.id || `task-${Date.now()}`,
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      createdAt: existingTask?.createdAt || new Date().toISOString().split("T")[0],
    };

    onSave(taskData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{existingTask ? "Edit Task" : "Create Task"}</h3>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
            autoFocus
          />
          <textarea
            placeholder="Enter description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows="3"
          />
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <div className="modal-actions">
            <button type="submit">
              {existingTask ? "Update Task" : "Add Task"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
