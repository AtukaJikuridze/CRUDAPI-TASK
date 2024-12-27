import React from "react";
import TodoSubmit from "./TodoSubmit";
import TodoElement from "./TodoElement";

const TodoMain = ({
  setEditActive,
  setEditInfo,
  todoList,
  fetchTodoList,
  isLoaded,
  BASE_KEY,
}) => {
  const submitTodo = (inputValue, isCompleted) => {
    if (inputValue.length === 0) return;

    fetch("/api/v1/todo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          title: inputValue,
          isCompleted: isCompleted,
        },
      ]),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        fetchTodoList();
      })
      .catch((error) => console.error("Error:", error));
  };

  const deleteTodo = (uuid) => {
    fetch(`/api/v1/todo/${uuid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${BASE_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        fetchTodoList();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="todo-main">
      {isLoaded ? (
        <div className="todo-content">
          <TodoSubmit submitTodo={submitTodo} />
          <div className="todo-list">
            {todoList.map((e) => (
              <TodoElement
                key={e.uuid}
                title={e.title}
                uuid={e.uuid}
                isCompleted={e.isCompleted}
                deleteTodo={() => deleteTodo(e.uuid)}
                setEditActive={setEditActive}
                editTodo={(id, title, isCompleted) => {
                  setEditInfo({ id, title, isCompleted });
                  setEditActive(true);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading Data...</h1>
      )}
    </div>
  );
};

export default TodoMain;
