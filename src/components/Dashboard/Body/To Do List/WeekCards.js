import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import lottie from "lottie-web";


import { useDispatch, useSelector } from "react-redux";
import "./week-cards.css";

import ToDoListLogo from "../../../../assets/to-do-list.svg";
import CircleTask from "../../../../assets/circle.svg";
import CircleTaskChecked from "../../../../assets/circle-checked.svg";
import PlusIcon from "../../../../assets/plus-icon.svg";
import DeleteIcon from "../../../../assets/delete-icon.svg";

const WeekCards = () => {
  const [weekTasks, setWeekTasks] = useState([]);
  const [newTaskInput, setTaskNewInput] = useState("");
  const currentProject = useSelector((state) => state.currentProject);
  const currentUsername = useSelector((state) => state.currentUsername);
  const dispatch = useDispatch();

  const loading_logo_container = useRef(null);

  useEffect(() => {
    if (isLoading) {
      lottie.loadAnimation({
        container: loading_logo_container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../../../../assets/loading.json"),
      });
    }
  }, []);

  const { isLoading, error, data } = useQuery("tasksData", () =>
    axios
      .post("http://3.227.181.107:2000/api/get-tasks", {
        project_name: currentProject,
        current_user: currentUsername
      })
      .then((res) => res.data)
  );

  useEffect(() => {
    if (data?.results) {
      setWeekTasks(data?.results);
    }
  }, [currentProject, data?.results]);

  const onTaskChecked = (taskIndex, newTask, day_index) => {
    let new_week_tasks = [...weekTasks];
    new_week_tasks[day_index][1].map((task, index) =>
      taskIndex === index
        ? (new_week_tasks[day_index][1][index] = newTask)
        : null
    );
    setWeekTasks(new_week_tasks);

    axios
        .post("http://3.227.181.107:2000/api/update-tasks", {
          project_name: currentProject,
          project_tasks: JSON.stringify(weekTasks),
          current_user: currentUsername
        })
        .then((response) => console.log(response));
  };

  const onAddTask = (new_task, day_index) => {
    if (new_task.content) {
      let new_week_tasks = [...weekTasks];
      new_week_tasks[day_index][1].push(new_task);
      setWeekTasks(new_week_tasks);

      axios
        .post("http://3.227.181.107:2000/api/update-tasks", {
          project_name: currentProject,
          project_tasks: JSON.stringify(weekTasks),
          current_user: currentUsername
        })
        .then((response) => console.log(response));
    }
  };

  const onDeleteTask = (new_task, day_index) => {
    let new_week_tasks = [...weekTasks];
    new_week_tasks[day_index][1].splice(new_week_tasks.indexOf(new_task), 1);
    setWeekTasks(new_week_tasks);

    axios
        .post("http://3.227.181.107:2000/api/update-tasks", {
          project_name: currentProject,
          project_tasks: JSON.stringify(weekTasks),
          current_user: currentUsername
        })
        .then((response) => console.log(response));
  };

  return (
    <>
      <section className="app-to-do-list-title">
        <h1>{currentProject} To Do List</h1>
        <img
          src={ToDoListLogo}
          alt="ToDoListL Logo"
          className="to-do-list-logo"
        />
      </section>
      <section className="week-cards-container slide-in-right">
        {isLoading ? (
          <section
            className="loading-logo-container"
            ref={loading_logo_container}
          />
        ) : (
          <>
            {weekTasks.map((day, day_index) => (
              <section key={day_index} className="week-card-container">
                <span>{day[0]}</span>
                {day[1].map((task, index) => (
                  <div key={index} className="week-card-tasks fade-in">
                    {task.checked ? (
                      <img
                        src={CircleTaskChecked}
                        alt="Circle"
                        className="plus-icon-img rotate-in-center"
                        onClick={() => {
                          task.checked = false;
                          onTaskChecked(index, task, day_index);
                        }}
                      />
                    ) : (
                      <img
                        src={CircleTask}
                        alt="Circle"
                        className="plus-icon-img fade-in"
                        onClick={() => {
                          task.checked = true;
                          onTaskChecked(index, task, day_index);
                        }}
                      />
                    )}

                    {task.content}
                    <img
                      src={DeleteIcon}
                      alt="Delete Icon"
                      className="delete-icon-task"
                      onClick={() => {
                        onDeleteTask(task, day_index);
                      }}
                    />
                  </div>
                ))}
                <section key={day_index} className="week-card-tasks">
                  <img
                    src={PlusIcon}
                    alt="Plus Icon"
                    className="plus-icon-img"
                    onClick={() => {
                      onAddTask(
                        { content: newTaskInput, checked: false },
                        day_index
                      );
                    }}
                  />
                  <input
                    key={day_index}
                    placeholder="Add a new task..."
                    onChange={(event) => setTaskNewInput(event.target.value)}
                  />
                </section>
              </section>
            ))}{" "}
          </>
        )}
      </section>
    </>
  );
};

export default WeekCards;
