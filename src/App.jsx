import { useState, useEffect } from "react";
import DeleteTodo from "./Components/DeleteTodo";
import EditTodo from "./Components/EditTodo";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAdd() {
    if (!todo.trim()) return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].text = todo;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: todo, done: false }]);
    }

    setTodo("");
  }

  function toggleDone(i) {
    const updated = [...todos];
    updated[i].done = !updated[i].done;
    setTodos(updated);
  }

  function deleteTodo(i) {
    setTodos(todos.filter((_, idx) => idx !== i));
  }

  function editTodo(i) {
    setTodo(todos[i].text);
    setEditIndex(i);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1220] via-[#0E1628] to-[#050A18] flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Task Manager
          </h1>
          <p className="text-gray-400 mt-1">
            A simple way to stay organised & focused.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-7 shadow-[0_0_25px_rgba(0,0,0,0.35)]">
          {/* INPUT ROW */}
          <div className="flex gap-3 mb-7">
            <input
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20
              text-white placeholder-gray-400
              focus:border-white/40 outline-none transition"
              type="text"
              placeholder="Write a task..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />

            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-indigo-700
              text-white font-medium shadow-lg shadow-indigo-900/40
              hover:scale-[1.03] active:scale-95 transition"
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-3">
            {todos.map((item, i) => (
              <div
                key={i}
                className="group flex items-center justify-between px-5 py-4
                rounded-2xl bg-white/10 border border-white/10
                hover:bg-white/15 transition shadow-lg"
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <span
                    onClick={() => toggleDone(i)}
                    className={`w-5 h-5 rounded-md border cursor-pointer transition 
                    ${
                      item.done
                        ? "bg-green-500 border-green-500"
                        : "border-gray-400"
                    }`}
                  />

                  <p
                    className={`text-lg text-white transition select-none
                    ${item.done ? "opacity-50 line-through" : ""}`}
                  >
                    {item.text}
                  </p>
                </div>

                <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100">
                  <EditTodo index={i} editTodo={editTodo} />
                  <DeleteTodo index={i} deleteTodo={deleteTodo} />
                </div>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <p className="text-gray-400 text-center mt-6">
              Nothing here yet — add your first task 👇
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
