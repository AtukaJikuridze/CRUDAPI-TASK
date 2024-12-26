import { FaRegTrashAlt } from "react-icons/fa";

const TodoElement = ({ title, uuid, deleteTodo }) => {
  return (
    <div className="todo-el">
      <p>{title}</p>
      <FaRegTrashAlt onClick={() => deleteTodo(uuid)} />
    </div>
  );
};

export default TodoElement;
