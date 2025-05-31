import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import BackButton from "../../components/backButton";
export default function TaskManagerApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = async () => {
    if (!input.trim()) return;
    const newTask = { name: input, id: Date.now() };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
        <BackButton />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Manager</h1>

      <div className="flex w-full max-w-md gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow border"
          >
            <span className="text-gray-700">{task.name}</span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
