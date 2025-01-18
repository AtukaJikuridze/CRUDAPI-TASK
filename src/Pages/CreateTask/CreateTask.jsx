import React, { useState, useContext } from "react";
import "./CreateTask.css";
import { Link, useNavigate } from "react-router";
import { MyContext } from "../../Context/Context";
import LanguageFilter from "../../LanguageFilter";
import LocalizedInput from "./LocalizedInput";

const CreateTask = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    completed: "no",
    date: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every((value) => value);
    if (!allFieldsFilled) {
      alert("Please fill in all the fields.");
      return;
    }

    // Prepare new task object
    const newTask = {
      ...formData,
      completed: formData.completed === "yes",
    };

    // Post the new task to the API
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
        <form onSubmit={submitForm}>
          <label>
            <LocalizedInput
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              english="Enter First Name"
              georgian="შეიყვანეთ სახელი"
              type="text"
            />
            <LocalizedInput
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              english="Enter Last Name"
              georgian="შეიყვანეთ გვარი"
              type="text"
            />
          </label>
          <LocalizedInput
            name="title"
            value={formData.title}
            onChange={handleChange}
            english="Enter Title"
            georgian="შეიყვანეთ სათაური"
            type="text"
          />
          <div className="select-flex-create">
            <h3>
              <LanguageFilter
                english={"Is Completed?"}
                georgian={"შესრულებულია?"}
              />
            </h3>
            <select
              name="completed"
              value={formData.completed}
              onChange={handleChange}
            >
              <option value="yes">
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
              name="date"
              value={formData.date}
              onChange={handleChange}
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

export default CreateTask;
