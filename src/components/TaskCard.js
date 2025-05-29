import React from "react";
import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, columnId, setBoard, board, onEdit }) {
  const handleDelete = () => {
    const updatedTasks = board[columnId].filter((t) => t.id !== task.id);
    setBoard({ ...board, [columnId]: updatedTasks });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? "#d1f0ff" : "#ffffff",
          }}
        >
          <h4>{task.title}</h4>
          <p className="meta">{task.description}</p>
          <p className="meta">Created: {task.createdAt}</p>
          <p className="priority">Priority: {task.priority}</p>

          <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
            <button onClick={() => onEdit(task, columnId)}>✏ Edit</button>
            <button onClick={handleDelete}>🗑 Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
