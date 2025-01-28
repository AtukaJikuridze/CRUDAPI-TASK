import "./App.css";
import EditTask from "./Pages/EditTask/EditTask";
import TodoMain from "./Pages/TodoMain/TodoMain";
import CreateTask from "./Pages/CreateTask/CreateTask";
import { Route, Routes } from "react-router";
import { useContext, useEffect } from "react";
import { MyContext } from "./Context/Context";
import Navbar from "./Navbar";

function App() {
  const { fetchTodoList } = useContext(MyContext);
  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route element={<TodoMain />} path="/" />
        <Route element={<TodoMain />} path="/TodoList" />
        <Route element={<CreateTask />} path="/CreateTask" />
        <Route element={<EditTask />} path="/EditTask" />
      </Routes>
    </div>
  );
}

export default App;
