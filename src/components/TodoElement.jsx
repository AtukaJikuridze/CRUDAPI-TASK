import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
const TodoElement = ({ title, uuid, isCompleted, deleteTodo, editTodo }) => {
  console.log(isCompleted);

  return (
    <div className="todo-el">
      <p
        className="is_completed"
        style={{ color: isCompleted ? "lime" : "red" }}
      >
        {isCompleted == true ? "Completed" : "Not Completed"}
      </p>
      <p>{title}</p>
      <FaEdit onClick={() => editTodo(uuid,title,isCompleted)} className="edit" />
      <FaRegTrashAlt onClick={() => deleteTodo(uuid)} className="delete" />
    </div>
  );
};

export default TodoElement;
