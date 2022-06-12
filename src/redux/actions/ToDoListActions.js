import { toDoListServices } from "../../services/ToDoListServices";
import { STATUS_CODE } from "../../util/setting";
import { setLstTodo } from "../reducers/TodoListReducers";

export const getLstTaskAPIAction = () => async (dispatch) => {
  try {
    const result = await toDoListServices.getAllTask();
    if (result.status === STATUS_CODE.SUCCESS) {
      await dispatch(setLstTodo(result.data));
    }
  } catch (error) {
    alert("Không thể lấy danh sách task từ hệ thống");
  }
};

export const addTaskAPIAction = (taskName) => async (dispatch) => {
  try {
    const result = await toDoListServices.addTask(taskName);
    if (result.status === STATUS_CODE.SUCCESS) {
      await dispatch(getLstTaskAPIAction());
    }
  } catch (error) {
    alert(error.response.data);
  }
};

export const delTaskAPIAction = (taskName) => async (dispatch) => {
  try {
    const result = await toDoListServices.deleteTask(taskName);
    if (result.status === STATUS_CODE.SUCCESS) {
      await dispatch(getLstTaskAPIAction());
    }
  } catch (error) {
    alert(error.response.data);
  }
};

export const doneTaskAPIAction = (taskName) => async (dispatch) => {
  try {
    const result = await toDoListServices.doneTask(taskName);
    if (result.status === STATUS_CODE.SUCCESS) {
      await dispatch(getLstTaskAPIAction());
    }
  } catch (error) {
    alert(error.response.data);
  }
};

export const rejectTaskAPIAction = (taskName) => async (dispatch) => {
  try {
    const result = await toDoListServices.rejectTask(taskName);
    if (result.status === STATUS_CODE.SUCCESS) {
      await dispatch(getLstTaskAPIAction());
    }
  } catch (error) {
    alert(error.response.data);
  }
};
