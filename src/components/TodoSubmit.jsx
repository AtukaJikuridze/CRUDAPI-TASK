import React from "react";
import { useState } from "react";

const TodoSubmit = ({ submitTodo, isAdded }) => {
  const [isCompleted, setIsCompleted] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setIsCompleted(selectedValue === "Yes" ? true : false);
  };
  return (
    <div className="input-main">
      <div className="input-flex">
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <input
          type="submit"
          disabled={isAdded == false ? true : false}
          onClick={() => {
            submitTodo(inputValue, isCompleted);
            setInputValue("");
          }}
        />
      </div>
      <div className="select-flex">
        <h3>is completed?</h3>
        <select onChange={handleChange}>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
    </div>
  );
};

export default TodoSubmit;
