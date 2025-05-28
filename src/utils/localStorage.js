
export const saveBoard = (board) => {
  localStorage.setItem("taskBoard", JSON.stringify(board));
};

export const loadBoard = () => {
  const data = localStorage.getItem("taskBoard");
  return data ? JSON.parse(data) : {
    todo: [],
    inprogress: [],
    done: [],
  };
};
