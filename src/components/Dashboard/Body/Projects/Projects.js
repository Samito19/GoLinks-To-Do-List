import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";

import { changeProject } from "../../../../Redux/actions";

import "./projects.css";
import ProjectsLogo from "../../../../assets/projects-logo.svg";
import IndivProjectIcon from "../../../../assets/individual-project-icon.svg";
import PlusIcon from "../../../../assets/plus-icon.svg";
import DeleteIcon from "../../../../assets/delete-icon.svg";
import axios from "axios";

const Projects = () => {
  const currentProject = useSelector((state) => state.currentProject);
  const currentUsername = useSelector((state) => state.currentUsername);
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");

  const { isLoading, error, data } = useQuery("projectsData", () =>
    axios
      .post("https://samiamsaf.com/api/get-projects", {
        current_user: currentUsername
      })
      .then((res) => res.data)
  );

  useEffect(() => {
    if (data?.results) {
      setProjects(data?.results);
    }
    console.log(data?.results);
  }, [projects, data?.results]);

  const onAddProject = (project_name) => {
    if (project_name !== "") {
      axios
        .post("https://samiamsaf.com/api/create-project", {
          project_name: project_name,
          current_user: currentUsername
        })
        .then((response) => console.log(response));

      let new_projects = [...projects];
      new_projects.push(project_name);
      setProjects(new_projects);
      setNewProjectName("");
      window.location.reload(false);
    }
  };

  const onDeleteProject = (project_name) => {
    if (projects.length > 1 && project_name != "Default project") {
      axios
        .post("https://samiamsaf.com/api/delete-project", {
          project_name: project_name,
          current_user: currentUsername
        })
        .then((response) => console.log(response));
    }

    let new_projects = [...projects];
    new_projects.splice(new_projects.indexOf(project_name), 1);
    setProjects(new_projects);
    window.location.reload(false);
    
  };
  return (
    <>
      <div className="app-menu-projects-title">
        <h1>My Projects</h1>
        <img src={ProjectsLogo} alt="Projects Logo" className="projects-logo" />
      </div>
      <div className="app-menu-projects">
        {projects.map((project, index) => (
          <div key={index} className="project-container fade-in">
            <div
              className="project-container-title"
              onClick={() => {
                dispatch(changeProject(project));
                window.location.reload(false);
              }}
            >
              <img
                src={IndivProjectIcon}
                alt="Indiv Project Icon"
                className="project-icon"
              />
              <span>{project}</span>
            </div>
            <div
              className="project-delete-container"
              onClick={() => {
                dispatch(changeProject("Default project"));
                onDeleteProject(project);
              }}
            >
              <img
                src={DeleteIcon}
                alt="Delete Icon"
                className="delete-icon-project"
              />
            </div>
          </div>
        ))}
        <div className="plus-project-container">
          <img
            src={PlusIcon}
            alt="Plus Icon"
            className="plus-icon-img-project"
            onClick={() => {
              onAddProject(newProjectName);
            }}
          />
          <input
            placeholder="Add a new project..."
            value={newProjectName}
            onChange={(event) => setNewProjectName(event.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Projects;
