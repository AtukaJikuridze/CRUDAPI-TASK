import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_KEY = "i_c2-xirJlF7OYPC8DM8qdHVXhi7Oej6CZUs5uQGV4XWYhqAAA";

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetch("/api/v1/todo", {
    headers: {
      Authorization: `Bearer ${BASE_KEY}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.items.map((item) => ({
    title: item.title,
    firstName: item.firstName,
    lastName: item.lastName,
    date: item.date,
    uuid: item._uuid,
    id: item.id,
    key: item._uuid,
    isCompleted: item.completed,
  }));
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    editInfo: {},
    isLoaded: false,
  },
  reducers: {
    setEditInfo(state, action) {
      state.editInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoaded = true;
      });
  },
});

export const { setEditInfo } = todoSlice.actions;
export default todoSlice.reducer;
