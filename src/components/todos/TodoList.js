import React from "react";
import TodoListSkeleton from "../skeleton/TodoListSkeleton";

const TodoList = ({ todos, toggleCompleted, deleteTodo }) => {
  return (
    <div className="ring-1 ring-slate-900 relative w-full py-3 bg-[#02131d] backdrop-blur-md backdrop-brightness-150 opacity-90 rounded-2xl">
      <div className="flex items-center justify-between my-4 ml-14">
        <h1 className="bg-gradient-to-tr from-blue-500 via-pink-300 to-purple-500 text-transparent bg-clip-text font-bold text-2xl">
          My Todo's
        </h1>
      </div>

      {/* Todo List */}
      <div className="p-4 md:p-10 flex flex-col gap-2 pb-20 h-[550px] overflow-auto ">
        {!todos.length ? (
          <div className="px-4">
            <TodoListSkeleton />
          </div>
        ) : (
          todos?.map(({ _id, title, description, isCompleted }) => (
            <div
              key={_id}
              className="group tracking-wide hover:bg-[#040a0f] p-4 rounded-md flex items-start justify-between"
            >
              <label
                className={`cursor-pointer inline-flex items-start text-gray-50`}
              >
                <input
                  className="mt-1 cursor-pointer text-fuchsia-500 focus:ring-0 focus:ring-offset-0 border-2 border-fuchsia-400 bg-transparent w-6 h-6 md:w-7 md:h-7 mr-4 md:mr-6 rounded-xl"
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleCompleted(_id, isCompleted)}
                />

                <div className="flex flex-col gap-[2px]">
                  <p className={`${isCompleted ? "line-through" : ""} text-lg`}>
                    {title}
                  </p>
                  <p
                    className={`${
                      isCompleted ? "line-through" : ""
                    } text-gray-400 text-md`}
                  >
                    {description}
                  </p>
                </div>
              </label>

              <button
                className="hidden group-hover:block text-fuchsia-500 mt-1"
                onClick={() => deleteTodo(_id)}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
