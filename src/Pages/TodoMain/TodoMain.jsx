import "./TodoMain.css";
import { MyContext } from "../../Context/Context";
import { useContext, useEffect, useState } from "react";
import TodoElement from "./TodoElement";
import { Link } from "react-router";
import { Circles } from "react-loader-spinner";
import LanguageFilter from "../../LanguageFilter";
const TodoMain = () => {
  const context = useContext(MyContext);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    if (
      typeof context.todoList === "string" &&
      context.todoList.trim().startsWith("[")
    ) {
      const parsedList = JSON.parse(context.todoList);
      setTodoList(parsedList);
    } else if (Array.isArray(context.todoList)) {
      setTodoList(context.todoList);
    } else {
      setTodoList([]);
    }
  }, [context.todoList]);

  return (
    <div className="todo-main">
      <Link to={"/CreateTask"}>
        <button>
          {
            <LanguageFilter
              english={"Create Task"}
              georgian={"შექმენი დავალება"}
            />
          }
        </button>
      </Link>
      <div className="list">
        {context.isLoaded ? (
          todoList.length ? (
            todoList.map((e) => (
              <TodoElement
                key={Math.random()}
                firstName={e.firstName}
                lastName={e.lastName}
                date={e.date}
                completeStatus={e.isCompleted}
                title={e.title}
                uuid={e.uuid}
                isCompleted={e.isCompleted}
              />
            ))
          ) : (
            <h1 style={{ color: "white" }}>
              {
                <LanguageFilter
                  english={"Todo List is Empty..."}
                  georgian={"სია ცარიელია..."}
                />
              }
            </h1>
          )
        ) : (
          <Circles color="white" />
        )}
      </div>
    </div>
  );
};

export default TodoMain;
