import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({ title, id, tasks, setBoard, board, onEdit }) => {
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
            style={{
              minHeight: "120px",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: snapshot.isDraggingOver ? "#d6ebff" : "#f1f3f4",
              transition: "background-color 0.3s ease",
            }}
          >
            {tasks.map((item, idx) => (
              <TaskCard
                key={item.id}
                task={item}
                index={idx}
                columnId={id}
                setBoard={setBoard}
                board={board}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
