import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../redux/todoSlice";
import TodoElement from "./TodoElement";
import { Link } from "react-router";
import { Circles } from "react-loader-spinner";
import LanguageFilter from "../../LanguageFilter";
import "./TodoMain.css";

const TodoMain = () => {
  const dispatch = useDispatch();
  const { todoList, isLoaded } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="todo-main">
      <Link to="/CreateTask">
        <button>
          <LanguageFilter english="Create Task" georgian="შექმენი დავალება" />
        </button>
      </Link>
      <div className="list">
        {isLoaded ? (
          todoList.length ? (
            todoList.map((todo) => (
              <TodoElement
                key={todo.uuid}
                title={todo.title}
                firstName={todo.firstName}
                lastName={todo.lastName}
                date={todo.date}
                uuid={todo.uuid}
                id={todo.id}
                completeStatus={todo.isCompleted}
              />
            ))
          ) : (
            <h1 style={{ color: "white" }}>
              <LanguageFilter
                english="Todo List is Empty..."
                georgian="სია ცარიელია..."
              />
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
