import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./login.css";
import GoLinksLogo from "../../assets/golinks-logo-2021-dark.svg";
import GolinksLoginText from "../../assets/login-into-golinks.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeUsername } from "../../Redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const currentUsername = useSelector((state) => state.currentUsername);
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    dispatch(changeUsername(''))
  }, [])
  

  const onConnect = () => {
    if (usernameInput === "") {
      return;
    }
    let data;
    axios
      .post("https://3.227.181.107:3000/api/create-user", {
        current_user: currentUsername,
      })
      .then((res) => (data = res.data));

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="login-page-container">
      <div className="login-page-header">
        <img
          src={GoLinksLogo}
          alt="GoLinks Header Logo"
          className="header-go-links-logo-img"
        />
      </div>
      <div className="login-page-body">
        <img
          src={GolinksLoginText}
          alt="GoLinks Header Logo"
          className="log-into-golinks-text"
        />
        <span>To Do List</span>
        <input
          placeholder="Enter your username"
          onChange={(event) => {
            setUsernameInput(event.target.value);
            dispatch(changeUsername(event.target.value));
          }}
        />
        <button type="button" className="login-button" onClick={onConnect}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Login;
