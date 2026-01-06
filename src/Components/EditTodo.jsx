const EditTodo = ({ index, editTodo }) => {
  return (
    <div>
      <i
        className="ri-edit-2-line text-blue-300 hover:text-blue-400 cursor-pointer text-xl"
        onClick={() => editTodo(index)}
      />
    </div>
  );
};

export default EditTodo;
