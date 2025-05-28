import React, { useState, useEffect } from "react";
import Column from "./Column";
import TaskModal from "./TaskModal";
import { DragDropContext } from "@hello-pangea/dnd";
import { loadBoard, saveBoard } from "../utils/localStorage";

const defaultBoard = {
  todo: [],
  inprogress: [],
  done: [],
};

function TaskBoard() {
  const [board, setBoard] = useState(defaultBoard);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetColumn, setTargetColumn] = useState("todo");

  useEffect(() => {
    const saved = loadBoard();
    if (saved) setBoard(saved);
  }, []);

  useEffect(() => {
    saveBoard(board);
  }, [board]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = [...board[source.droppableId]];
    const [movedTask] = sourceCol.splice(source.index, 1);

    const destCol = [...board[destination.droppableId]];
    destCol.splice(destination.index, 0, movedTask);

    setBoard({
      ...board,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });
  };

  const handleAddTask = (columnId) => {
    setTargetColumn(columnId);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task) => {
    const updatedCol = [...board[targetColumn], task];
    setBoard({ ...board, [targetColumn]: updatedCol });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="taskboard">
          {["todo", "inprogress", "done"].map((col) => (
            <div key={col}>
              <Column
                title={
                  col === "todo"
                    ? "To Do"
                    : col === "inprogress"
                    ? "In Progress"
                    : "Done"
                }
                id={col}
                tasks={board[col]}
                setBoard={setBoard}
                board={board}
              />
              <div style={{ textAlign: "center", margin: "10px 0" }}>
                <button onClick={() => handleAddTask(col)}>➕ Add Task</button>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </>
  );
}

export default TaskBoard;
