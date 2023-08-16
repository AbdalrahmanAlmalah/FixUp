import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import TelegramIcon from "@mui/icons-material/Telegram";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { checkCookie } from "../../../CheckCookie/checkCookie";

const Header = () => {
  const navigate = useNavigate();
  const [navList] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const api = process.env.REACT_APP_API_LOCAL;
  let menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    handleLogin();
  }, [loggedIn]);

  const handleLogin = () => {
    try {
      const isLoggedIn = !!checkCookie();
      setLoggedIn(isLoggedIn);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggedIn(false);
      await axios.get(api + "/logout", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo.png" alt="" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            {loggedIn ? (
              <div className="menu-container" ref={menuRef}>
                <div
                  className="menu-trigger"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <AccountCircleRoundedIcon className="icon" style={{color:'#3E54AC' ,marginRight:100}}/>
                </div>
                <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
                  <ul>
                    <li className="dropdownItem"
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      <AccountCircleRoundedIcon />
                      <Link to="/profile">My Profile</Link>
                    </li>
                    <li className="dropdownItem" 
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      <HistoryIcon />
                      <Link to="/history">History</Link>
                    </li>
                    <li className="dropdownItem"
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      <LogoutRoundedIcon />
                      <button id="myButton" onClick={handleLogout}>
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to={"login"}>
                <button className="btn1" onClick={handleLogin}>
                  <i className="fa fa-sign-in"></i> Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;