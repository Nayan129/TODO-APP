import React from "react";

const DeleteTodo = ({ index, deleteTodo }) => {
  return (
      <div>
        <i
          className="ri-delete-bin-line text-red-300 hover:text-red-500 cursor-pointer text-xl"
          onClick={() => deleteTodo(index)}
        />
      </div>
  );
};

export default DeleteTodo;
