import React, { useState, useEffect } from "react";
import Column from "./Column";
import TaskModal from "./TaskModal";
import { DragDropContext } from "@hello-pangea/dnd";
import { loadBoard, saveBoard } from "../utils/localStorage";

const initialBoardState = {
  todo: [],
  inprogress: [],
  done: [],
};

const TaskBoard = () => {
  const [boardData, setBoardData] = useState(initialBoardState);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeColumn, setActiveColumn] = useState("todo");
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);
  const [taskEditColumn, setTaskEditColumn] = useState("");

  useEffect(() => {
    const storedBoard = loadBoard();
    if (storedBoard) {
      setBoardData(storedBoard);
    }
  }, []);

  useEffect(() => {
    saveBoard(boardData);
  }, [boardData]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceTasks = [...boardData[source.droppableId]];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    const destinationTasks = [...boardData[destination.droppableId]];
    destinationTasks.splice(destination.index, 0, movedTask);

    setBoardData({
      ...boardData,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    });
  };

  const openAddModal = (columnKey) => {
    setActiveColumn(columnKey);
    setTaskBeingEdited(null);
    setTaskEditColumn("");
    setModalVisible(true);
  };

  const openEditModal = (task, columnKey) => {
    setTaskBeingEdited(task);
    setTaskEditColumn(columnKey);
    setModalVisible(true);
  };

  const handleTaskSave = (task) => {
    if (taskBeingEdited) {
      // Updating an existing task
      const updatedTasks = boardData[taskEditColumn].map((item) =>
        item.id === task.id ? task : item
      );
      setBoardData({ ...boardData, [taskEditColumn]: updatedTasks });
      setTaskBeingEdited(null);
      setTaskEditColumn("");
    } else {
      // Adding a new task
      const updatedTasks = [...boardData[activeColumn], task];
      setBoardData({ ...boardData, [activeColumn]: updatedTasks });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="taskboard">
          {["todo", "inprogress", "done"].map((key) => (
            <div key={key}>
              <Column
                title={
                  key === "todo"
                    ? "To Do"
                    : key === "inprogress"
                    ? "In Progress"
                    : "Completed"
                }
                id={key}
                tasks={boardData[key]}
                setBoard={setBoardData}
                board={boardData}
                onEdit={openEditModal}
              />
              <div style={{ textAlign: "center", margin: "10px 0" }}>
                <button onClick={() => openAddModal(key)}>➕ Add Task</button>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setTaskBeingEdited(null);
        }}
        onSave={handleTaskSave}
        existingTask={taskBeingEdited}
      />
    </>
  );
};

export default TaskBoard;
