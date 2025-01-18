import { createContext, useState } from "react";

// Create the context
export const MyContext = createContext();

// Create the provider component
export const MyContextProvider = ({ children }) => {
  const BASE_KEY = "6q1jjDKgbJ3Ps9yX4gpMZKjlD_VbaZoILTb07gwOVgG7RXKg1g";
  const [editInfo, setEditInfo] = useState({});
  const [editActive, setEditActive] = useState(false);
  const [todoList, setTodoList] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState("EN");
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
          firstName: item.firstName,
          lastName: item.lastName,
          date: item.date,
          uuid: item._uuid,
          id: item.id,
          key: item._uuid,
          isCompleted: item.completed,
        }));
        setTodoList(JSON.stringify(filteredData));
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoaded(true));
  };

  return (
    <MyContext.Provider
      value={{
        BASE_KEY,
        editInfo,
        setEditInfo,
        setEditActive,
        editActive,
        fetchTodoList,
        todoList,
        setTodoList,
        setIsLoaded,
        isLoaded,
        language,
        setLanguage,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
