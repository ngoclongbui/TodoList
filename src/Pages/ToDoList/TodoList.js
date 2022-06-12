/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import pgHeader from "../../assets/image/X2oObC4.png";
import moment from "moment";
import {
  addTaskAPIAction,
  delTaskAPIAction,
  doneTaskAPIAction,
  getLstTaskAPIAction,
  rejectTaskAPIAction,
} from "../../redux/actions/ToDoListActions";
import { useDispatch, useSelector } from "react-redux";

export default function TodoList() {
  const dispatch = useDispatch();
  const { lstTask } = useSelector((state) => state.TodoListReducers);

  let [state, setState] = useState({
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  useEffect(() => {
    dispatch(getLstTaskAPIAction());
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (state.values.taskName !== "") {
      dispatch(addTaskAPIAction(state.values.taskName));
      let newValues = { ...state.values };
      newValues["taskName"] = "";
      setState({
        ...state,
        values: newValues,
      });
    } else {
      let newErrors = { ...state.errors };
      newErrors["taskName"] = "taskName invalid!";
      setState({
        ...state,
        errors: newErrors,
      });
    }
  };

  const delTask = (taskName) => {
    dispatch(delTaskAPIAction(taskName));
  };

  const checkTask = (taskName) => {
    dispatch(doneTaskAPIAction(taskName));
  };

  const rejectTask = (taskName) => {
    dispatch(rejectTaskAPIAction(taskName));
  };

  const handleChange = (e) => {
    let { value, name } = e.target;
    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...state.errors };
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid!";
    } else {
      newErrors[name] = "";
    }
    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  const renderToDo = () => (
    <ul className="todo" id="todo">
      {lstTask
        .filter((item) => !item.status)
        .map((item, index) => {
          return (
            <li key={index}>
              <span>{item.taskName}</span>
              <div className="buttons">
                <button
                  className="remove"
                  type="button"
                  onClick={() => {
                    delTask(item.taskName);
                  }}
                >
                  <i className="fa fa-trash-alt" />
                </button>
                <button
                  type="button"
                  className="complete"
                  onClick={() => {
                    checkTask(item.taskName);
                  }}
                >
                  <i className="far fa-check-circle" />
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );

  const renderTaskDone = () => (
    <ul className="todo" id="completed">
      {lstTask
        .filter((item) => item.status)
        .map((item, index) => {
          return (
            <li key={index}>
              <span>{item.taskName}</span>
              <div className="buttons">
                <button
                  className="remove"
                  type="button"
                  onClick={() => {
                    delTask(item.taskName);
                  }}
                >
                  <i className="fa fa-trash-alt" />
                </button>
                <button
                  type="button"
                  className="complete"
                  onClick={() => {
                    rejectTask(item.taskName);
                  }}
                >
                  <i className="fas fa-undo" />
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );

  return (
    <form onSubmit={addTask}>
      <div className="card">
        <div className="card__header">
          <img src={pgHeader} alt="workplace" />
        </div>
        <div className="card__body">
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p>{moment().format("MMMM DD,YYYY")}</p>
            </div>
            <div className="card__add">
              <input
                name="taskName"
                id="newTask"
                type="text"
                value={state.values.taskName}
                placeholder="Enter an activity..."
                onChange={handleChange}
              />
              <button id="addItem" onClick={addTask}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <p className="error">{state.errors.taskName}</p>
            <div className="card__todo">
              {renderToDo()}
              {renderTaskDone()}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
