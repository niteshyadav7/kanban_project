import React from "react";
import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, columnId, setBoard, board }) {
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
          <button onClick={handleDelete} style={{ marginTop: "8px" }}>
            🗑 Delete
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
