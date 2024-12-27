import "./App.css";
import TodoMain from "./components/TodoMain";
import EditPopup from "./components/EditPopup";
import { useState, useEffect } from "react";

function App() {
  const [editActive, setEditActive] = useState(false);
  const [editInfo, setEditInfo] = useState({});
  const [todoList, setTodoList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const BASE_KEY = "6q1jjDKgbJ3Ps9yX4gpMZKjlD_VbaZoILTb07gwOVgG7RXKg1g";

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
          isCompleted: item.isCompleted,
        }));
        setTodoList(filteredData);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoaded(true));
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <div className="App">
      <EditPopup
        editActive={editActive}
        setEditActive={setEditActive}
        editInfo={editInfo}
        fetchTodoList={fetchTodoList}
        BASE_KEY={BASE_KEY}
      />
      <TodoMain
        setEditActive={setEditActive}
        setEditInfo={setEditInfo}
        todoList={todoList}
        fetchTodoList={fetchTodoList}
        isLoaded={isLoaded}
        BASE_KEY={BASE_KEY}
      />
    </div>
  );
}

export default App;
