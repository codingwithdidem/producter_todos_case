import React, { useEffect, useState } from "react";
import { ref, onValue, push, remove, update, off } from "firebase/database";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { database } from "../utils/firebase";

import Layout from "../components/layout/Layout";
import TodoList from "../components/todos/TodoList";
import TodoModal from "../components/todos/TodoModal";
import Prompt from "../components/todos/Prompt";

const container = {
  hidden: { opacity: 0, translateY: 100 },
  show: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todosRef = ref(database, "todos/");

    let todoList = [];

    onValue(todosRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        todoList = Object.keys(data).map((key) => ({
          ...data[key],
          _id: key,
        }));

        setTodos(todoList);
      } else {
        setTodos([]);
      }
    });

    return () => off(todosRef);
  }, []);

  const toggleCompleted = (todoId, isCompleted) => {
    update(ref(database, `todos/${todoId}`), { isCompleted: !isCompleted });
  };

  const toggleCompletedAll = () => {
    todos.forEach((todo) => {
      update(ref(database, `todos/${todo._id}`), {
        isCompleted: true,
      });
    });
  };

  const addNewTodo = (title, description) => {
    if (!title || !description) return;

    push(ref(database, "todos/"), {
      title,
      description,
      isCompleted: false,
    });

    onClose();
  };

  const deleteTodo = (todoId) => {
    remove(ref(database, `todos/${todoId}`));
  };

  const deleteAllTodos = () => {
    todos.forEach((todo) => {
      if (todo.isCompleted) {
        remove(ref(database, `todos/${todo._id}`));
      }
    });

    setIsPromptOpen(false);
  };

  const downloadTodoList = () => {
    const doc = new jsPDF();

    const tableColumn = ["Title", "Description", "Status"];
    const tableRows = [];

    todos.forEach((todo) => {
      const todoData = [
        todo.title,
        todo.description,
        todo.isCompleted ? "Completed" : "Incomplete",
      ];

      tableRows.push(todoData);
    });

    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });

    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // title. and margin-top + margin-left
    doc.text("Todolist Report", 14, 15);
    // we define the name of our PDF file.
    doc.save(`todos_${dateStr}.pdf`);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <TodoList
          onOpen={onOpen}
          todos={todos}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-opacity-70 fixed bottom-5 max-w-xs md:max-w-sm grid grid-cols-4 place-content-center place-items-center w-full bg-[#03111a] ring-1 ring-indigo-200 z-10 shadow-2xl rounded-2xl h-14 md:h-16"
        >
          {/* Delete All Completed Todos */}
          <motion.button
            whileHover={{ scale: 1.1, transition: { duration: 0.05 } }}
            className="h-10 w-10 bg-red-400 flex items-center justify-center rounded-md text-white"
            onClick={() => setIsPromptOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </motion.button>

          {/* Complete All Todos */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="h-10 w-10 bg-green-400 flex items-center justify-center rounded-md text-white"
            onClick={toggleCompletedAll}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.button>

          {/* Download Todo List */}

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="h-10 w-10 bg-indigo-700 flex items-center justify-center rounded-md text-white"
            onClick={downloadTodoList}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </motion.button>

          {/* Add New Todo */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="h-10 w-10 bg-gradient-to-tr from-blue-600  to-purple-500 flex items-center justify-center rounded-md text-white"
            onClick={onOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      <TodoModal isOpen={isOpen} onClose={onClose} addNewTodo={addNewTodo} />
      <Prompt
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        onAccept={deleteAllTodos}
      />
    </Layout>
  );
}
