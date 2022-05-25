import React from "react";
import { useSelector } from "react-redux";


import "./header.css";
import GoLinksLogo from "../../../assets/golinks-logo-2021-dark.svg";
import AvatarLogo from "../../../assets/avatar-logo.svg";

const Header = () => {
  const currentUsername = useSelector((state) => state.currentUsername);

  return (
    <div className="header-container">
      <img
        src={GoLinksLogo}
        alt="GoLinks Header Logo"
        className="header-go-links-logo"
      />
      <div className="header-profile">
        <span>Welcome, {currentUsername}</span>
        <img
          src={AvatarLogo}
          alt="Avatar Header Logo"
          className="header-avatar-logo"
        />
      </div>
    </div>
  );
};

export default Header;
