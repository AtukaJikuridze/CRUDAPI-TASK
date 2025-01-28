import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const BASE_KEY = "i_c2-xirJlF7OYPC8DM8qdHVXhi7Oej6CZUs5uQGV4XWYhqAAA";
  const [editInfo, setEditInfo] = useState({});
  const [todoList, setTodoList] = useState([]);
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
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const formattedData = data.items.map((item) => ({
          ...item,
          isCompleted: item.completed,
          key: item._uuid,
        }));
        setTodoList(formattedData);
      })
      .catch((error) => console.error("Error fetching todos:", error))
      .finally(() => setIsLoaded(true));
  };

  return (
    <MyContext.Provider
      value={{
        BASE_KEY,
        editInfo,
        setEditInfo,
        fetchTodoList,
        todoList,
        setTodoList,
        isLoaded,
        setIsLoaded,
        language,
        setLanguage,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
