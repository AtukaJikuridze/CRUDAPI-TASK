import React, { useContext } from "react";
import { Link } from "react-router";
import { MyContext } from "../../Context/Context";
import { FaEdit } from "react-icons/fa";
import LanguageFilter from "../../LanguageFilter";

const TodoElement = ({
  completeStatus,
  firstName,
  lastName,
  date,
  title,
  uuid,
  isCompleted,
}) => {
  const context = useContext(MyContext);

  const deleteTask = () => {
    context.fetchTodoList();

    fetch(`/api/v1/todo/${uuid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${context.BASE_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        context.fetchTodoList();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        context.setIsLoaded(false);
      });
  };
  const setEditInfo = () => {
    context.setEditInfo({
      title,
      firstName,
      lastName,
      date,
      uuid,
      isCompleted,
    });
  };

  return (
    <div className="task">
      <div className="complete-status">
        <p style={{ color: completeStatus ? "limegreen" : "red" }}>
          {completeStatus ? (
            <LanguageFilter english={"Completed"} georgian={"შესრულებულია"} />
          ) : (
            <LanguageFilter
              english={"Not Completed"}
              georgian={"არ არის შესრულებული"}
            />
          )}
        </p>
      </div>
      <div className="date">{date}</div>
      <div className="delete" onClick={deleteTask}>
        <LanguageFilter english={"Delete Task"} georgian={"წაშლა"} />
      </div>
      <div className="user-name">
        <p>{firstName}</p>
        <p>{lastName}</p>
      </div>
      <p className="title">{title}</p>
      <Link to={"/EditTask"} className="edit" onClick={setEditInfo}>
        <FaEdit />
      </Link>
    </div>
  );
};

export default TodoElement;
