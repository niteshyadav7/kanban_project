export const storeBoardData = (boardState) => {
  localStorage.setItem("kanbanBoardData", JSON.stringify(boardState));
};

export const retrieveBoardData = () => {
  const storedData = localStorage.getItem("kanbanBoardData");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return {
    todo: [],
    inprogress: [],
    done: [],
  };
};
