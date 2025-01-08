import React, { useContext, useRef } from "react";
import "./CreateTask.css";
import { Link, useNavigate } from "react-router";
import { MyContext } from "../../Context/Context";

const CreateTask = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const completedRef = useRef(null);
  const dateRef = useRef(null);
  const submitForm = (e) => {
    e.preventDefault();

    const fields = [
      completedRef.current.value,
      firstNameRef.current.value,
      lastNameRef.current.value,
      titleRef.current.value,
      dateRef.current.value,
    ];

    // if (fields.some((value) => !value)) {
    //   alert("Please fill in all the fields.");
    //   return;
    // }

    const newTask = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      title: titleRef.current.value,
      date: dateRef.current.value,
      completed: completedRef.current.value === "yes",
    };

    fetch("/api/v1/todo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.BASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([newTask]),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        context.fetchTodoList();
        navigate("/TodoList");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="create-task">
      <div className="create-box">
        <Link to={"/TodoList"}>
          <h1>Back To TodoList</h1>
        </Link>
        <h2>Create Todo</h2>
        <form onSubmit={submitForm}>
          <label>
            <input
              type="text"
              placeholder="Enter First Name"
              ref={firstNameRef}
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              ref={lastNameRef}
            />
          </label>
          <input type="text" placeholder="Enter Title" ref={titleRef} />
          <div className="select-flex-create">
            <h3>Is Completed?</h3>
            <select ref={completedRef}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="date-picker">
            <h3>Choose a Date</h3>
            <input type="date" ref={dateRef} />
          </div>
          <input type="submit" value={"Submit Data"} />
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
