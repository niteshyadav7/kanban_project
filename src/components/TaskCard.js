import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index, columnId, board, setBoard, onEdit }) => {
  const removeTask = () => {
    const filteredTasks = board[columnId].filter((item) => item.id !== task.id);
    const updatedBoard = { ...board, [columnId]: filteredTasks };
    setBoard(updatedBoard);
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
            backgroundColor: snapshot.isDragging ? "#e0f7ff" : "#fff",
          }}
        >
          <h4>{task.title}</h4>
          <p className="meta">{task.description}</p>
          <p className="meta">Date: {task.createdAt}</p>
          <p className="priority">Level: {task.priority}</p>

          <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
            <button onClick={() => onEdit(task, columnId)}>✏ Edit</button>
            <button onClick={removeTask}>🗑 Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
