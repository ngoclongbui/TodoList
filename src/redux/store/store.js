import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import TodoListReducers from "../reducers/TodoListReducers";

const reducer = combineReducers({
  TodoListReducers,
});

const store = configureStore(
  {
    reducer,
  },
  applyMiddleware(thunk)
);

export default store;
