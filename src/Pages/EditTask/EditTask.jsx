import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MyContext } from "../../Context/Context";
import LanguageFilter from "../../LanguageFilter";
import LocalizedInput from "../CreateTask/LocalizedInput";

const EditTask = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [firstName, setFirstName] = useState(context.editInfo.firstName);
  const [lastName, setLastName] = useState(context.editInfo.lastName);
  const [title, setTitle] = useState(context.editInfo.title);
  const [uuid, setUuid] = useState(context.editInfo.uuid);
  const [isCompleted, setIsCompleted] = useState(context.editInfo.isCompleted);
  const [date, setDate] = useState(formatDate(context.editInfo.date));
  console.log(isCompleted);

  const editForm = (e) => {
    e.preventDefault();

    const updatedTodo = {
      firstName,
      lastName,
      title,
      uuid,
      completed: isCompleted,
      date,
    };

    fetch(`/api/v1/todo/${uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.BASE_KEY}`,
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update todo");
        }
        return response.json();
      })
      .then(() => {
        context.fetchTodoList();
        navigate("/TodoList");
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  return (
    <div className="create-task">
      <div className="create-box">
        <Link to={"/TodoList"}>
          <h1>
            <LanguageFilter
              english={"Back to todo List.."}
              georgian={"დაბრუნდი საწყის გვერძე"}
            />
          </h1>
        </Link>
        <h2>
          <LanguageFilter
            english={"Create Todo"}
            georgian={"დავალების შექმნა"}
          />
        </h2>
        <form onSubmit={editForm}>
          <label>
            <LocalizedInput
              english="Enter First Name"
              georgian="შეიყვანეთ სახელი"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <LocalizedInput
              english="Enter Last Name"
              georgian="შეიყვანეთ გვარი"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <LocalizedInput
            name="title"
            english="Enter Title"
            georgian="შეიყვანეთ სათაური"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="select-flex-create">
            <h3>
              <LanguageFilter
                english={"Is Completed?"}
                georgian={"შესრულებულია?"}
              />
            </h3>
            <select
              value={isCompleted ? "Yes" : "No"}
              onChange={(e) => setIsCompleted(e.target.value === "Yes")}
            >
              <option
                value={isCompleted ? "Yes" : "No"}
                onChange={(e) => setIsCompleted(e.target.value === "Yes")}
              >
                <LanguageFilter english={"Yes"} georgian={"კი"} />
              </option>
              <option value="no">
                <LanguageFilter english={"No"} georgian={"არა"} />
              </option>
            </select>
          </div>
          <div className="date-picker">
            <h3>
              <LanguageFilter
                english={"Choose a Date"}
                georgian={"აირჩიეთ ვადა"}
              />
            </h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button type="submit">
            <LanguageFilter
              english={"Submit Data"}
              georgian={"დავალების შექმნა"}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
