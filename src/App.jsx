import "./App.css";

import TodoMain from "./components/TodoMain";
import EditPopup from "./components/EditPopup";
import { useState } from "react";
function App() {
  const [editActive, setEditActive] = useState(false);
  const [editInfo, setEditInfo] = useState({});

  return (
    <div className="App">
      <EditPopup editActive={editActive} setEditActive={setEditActive} />
      <TodoMain setEditActive={setEditActive} setEditInfo={setEditInfo} />
    </div>
  );
}

export default App;
