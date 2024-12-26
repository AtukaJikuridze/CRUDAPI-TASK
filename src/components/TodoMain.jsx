import React, { useState, useEffect } from "react";
import TodoSubmit from "./TodoSubmit";
import TodoElement from "./TodoElement";

const TodoMain = () => {
  const [todoList, setTodoList] = useState([]);
  const BASE_KEY = "6q1jjDKgbJ3Ps9yX4gpMZKjlD_VbaZoILTb07gwOVgG7RXKg1g";
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(null);

  // Function to fetch the todo list
  const fetchTodoList = () => {
    setIsLoaded(false);
    fetch("/api/v1/todo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BASE_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredData = data.items.map((item) => ({
          title: item.title,
          uuid: item._uuid,
          id: item.id,
          key: item._uuid,
        }));
        setTodoList(filteredData);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoaded(true));
  };

  // Fetch todo list when component is mounted
  useEffect(() => {
    fetchTodoList();
  }, []);

  // Submit a new todo
  const submitTodo = (inputValue) => {
    if (inputValue.length === 0) return;
    setIsAdded(false);

    fetch("/api/v1/todo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          title: inputValue,
        },
      ]),
    })
      .then((response) => {
        setIsAdded(true);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // After adding a new todo, re-fetch the todo list
        fetchTodoList();
      })
      .catch((error) => console.error("Error:", error));
  };

  // Delete a todo
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
        // After deletion, re-fetch the todo list
        fetchTodoList();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="todo-main">
      {isLoaded ? (
        <div className="todo-content">
          <TodoSubmit submitTodo={submitTodo} isAdded={isAdded} />
          <div className="todo-list">
            {todoList.map((e) => (
              <TodoElement
                title={e.title}
                key={e.uuid}
                uuid={e.uuid}
                deleteTodo={() => deleteTodo(e.uuid)}
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
