import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lstTask: [],
};

const ToDoListReducers = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLstTodo: (state, action) => {
      state.lstTask = action.payload;
    },
  },
});

export const { setLstTodo } = ToDoListReducers.actions;

export default ToDoListReducers.reducer;
