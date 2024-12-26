import React from "react";
import { useState } from "react";

const TodoSubmit = ({ submitTodo, isAdded }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="input-main">
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <input
        type="submit"
        disabled={isAdded == false ? true : false}
        onClick={() => {
          submitTodo(inputValue);
          setInputValue("");
        }}
      />
    </div>
  );
};

export default TodoSubmit;
