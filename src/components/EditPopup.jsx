import { useState, useEffect } from "react";
const EditPopup = ({
  editActive,
  setEditActive,
  editInfo,
  fetchTodoList,
  BASE_KEY,
}) => {
  const [editTitle, setEditTitle] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    setEditTitle(editInfo?.title || "");
    setEditCompleted(editInfo?.isCompleted ?? false);
    setId(editInfo?.id ?? null);
  }, [editInfo]);

  const submitForm = (e) => {
    e.preventDefault();
    if (editTitle.length === 0) return;
    const updatedTodo = {
      title: editTitle,
      isCompleted: editCompleted,
    };

    fetch(`/api/v1/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BASE_KEY}`,
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
        fetchTodoList();
        setEditActive(false);
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  return (
    <div className={`${editActive ? "active" : ""} edit-bg`}>
      <div className="edit-box">
        <h2>Edit Todo</h2>
        <form onSubmit={submitForm}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <div className="select-flex-edit">
            <h3>is Complated?</h3>
            <select
              value={editCompleted ? "yes" : "no"}
              onChange={(e) => setEditCompleted(e.target.value === "yes")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <input type="submit" value={"Submit Data"} />
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
