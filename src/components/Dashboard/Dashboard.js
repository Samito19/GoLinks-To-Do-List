import React from 'react'

import "./dashboard.css"

import WeekCards from '../Dashboard/Body/To Do List/WeekCards';

import Header from "../../components/Dashboard/Header/Header";

import Projects from "../Dashboard/Body/Projects/Projects"

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Header />
      </header>
      <body className="dashboard-body">
        <section className="dashboard-menu-container">
          <Projects/>
        </section>
        <section className="dashboard-body-title-week-cards">
          <section className="dashboard-week-cards-section">
            <WeekCards />
          </section>
        </section>
      </body>
      <span className="dashboard-footer-rigths">
        @ 2022 GoLinks, Inc x Sami Amsaf | All rights reserved
      </span>
    </div>
  )
}

export default Dashboard