import React, { useState, useEffect } from "react";

function TaskModal({ isOpen, onClose, onSave, existingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setPriority(existingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Low");
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const newTask = {
      id: existingTask?.id || `task-${Date.now()}`,
      title,
      description,
      priority,
      createdAt: existingTask?.createdAt || new Date().toISOString().split("T")[0],
    };

    onSave(newTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{existingTask ? "Edit Task" : "Add New Task"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <div className="modal-actions">
            <button type="submit">{existingTask ? "Update" : "Add"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
