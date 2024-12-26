import { FaX } from "react-icons/fa6";

const EditPopup = ({ editActive, setEditActive }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
  };

  return (
    <div className={`${editActive ? "active" : ""} edit-bg`}>
      <div className="edit-box">
        <FaX onClick={() => setEditActive(false)} />
        <h2>Edit Todo </h2>
        <form>
          <input type="text"  />

          <div className="select-flex-edit">
            <h3>is Completed</h3>
            <select onChange={handleChange}>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <input type="submit" value="Submit Data" />
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
