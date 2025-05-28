
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function Column({ title, id, tasks, setBoard, board }) {
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
              minHeight: "100px",
              backgroundColor: snapshot.isDraggingOver ? "#dfe6e9" : "#ecf0f1",
              padding: "10px",
              borderRadius: "6px",
              transition: "background-color 0.2s",
            }}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                columnId={id}
                setBoard={setBoard}
                board={board}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
