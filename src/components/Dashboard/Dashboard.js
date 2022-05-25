import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";
import GithubIcon from "../../assets/github.svg";
import LinkedIn from "../../assets/linkedin.svg";

import WeekCards from "../Dashboard/Body/To Do List/WeekCards";
import Header from "../../components/Dashboard/Header/Header";
import Projects from "../Dashboard/Body/Projects/Projects";

const Dashboard = () => {
  const currentUsername = useSelector((state) => state.currentUsername);
  const [isReady, setIsReady] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    if (currentUsername === "") {
      navigate("/", { replace: true });
    }

    setIsReady(true)

  }, []);

  return (
    <>
      {isReady ? (
        <div className="dashboard-container">
          <header className="dashboard-header">
            <Header />
          </header>
          <body className="dashboard-body">
            <section className="dashboard-menu-container">
              <Projects />
            </section>
            <section className="dashboard-body-title-week-cards">
              <section className="dashboard-week-cards-section">
                <WeekCards />
              </section>
            </section>
          </body>
          <div className="dashboard-footer-rigths">
            <a href="https://github.com/Samito19">
              <img src={GithubIcon} alt="Github ICon" className="links-icon" />
            </a>
            <a href="https://www.linkedin.com/in/sami-amsaf/">
              <img src={LinkedIn} alt="LinkedIn ICon" className="links-icon" />
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
