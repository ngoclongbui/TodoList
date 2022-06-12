import Axios from "axios";
import { DOMAIN } from "../util/setting";

export class ToDoListServices {
  getAllTask = () => {
    return Axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: "GET",
    });
  };

  addTask = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/AddTask`,
      method: "POST",
      data: {
        taskName: taskName,
      },
    });
  };

  deleteTask = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
  };

  doneTask = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
  };

  rejectTask = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
  };
}

export const toDoListServices = new ToDoListServices();
