import React, { useContext } from "react";
import { MyContext } from "../../Context/Context";

const TodoElement = ({
  completeStatus,
  firstName,
  lastName,
  date,
  title,
  uuid,
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

  return (
    <div className="task">
      <div className="complete-status">
        <p style={{ color: completeStatus ? "limegreen" : "red" }}>
          {completeStatus ? "Completed" : "Not Completed"}
        </p>
      </div>
      <div className="date">{date}</div>
      <div className="delete" onClick={deleteTask}>
        Delete Task
      </div>
      <div className="user-name">
        <p>{firstName}</p>
        <p>{lastName}</p>
      </div>
      <p className="title">{title}</p>
    </div>
  );
};

export default TodoElement;
