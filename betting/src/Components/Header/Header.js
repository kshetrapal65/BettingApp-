import React, { useState } from "react";
import "../Header.css";
import SportList from "../../JSON/SportList";
import { Link, useNavigate } from "react-router-dom";
import { getToken, getUserdata } from "../../Helper/Storage";
import { formatCapital } from "../formatCapitalize";
import { FaBell } from "react-icons/fa";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showHtmlCssSubMenu, setShowHtmlCssSubMenu] = useState(false);
  const [showJsSubMenu, setShowJsSubMenu] = useState(false);
  const navigate = useNavigate();

  const [showMoreSubMenu, setShowMoreSubMenu] = useState(false);
  const data = SportList;
  const token = getToken();
  const userData = getUserdata();
  const userName = userData?.name?.slice(0, 1);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };
  const uniqueGroups = [];
  data?.map((item) => {
    if (!uniqueGroups?.includes(item.group)) {
      uniqueGroups.push(item.group);
    }
  });
  const logout = () => {
    localStorage.removeItem("@userToken");
    navigate("/login");
    toggleDrawer();
  };

  return (
    <nav className="navbar p-0">
      <div className="navbar">
        <i className="bx bx-menu" onClick={toggleDrawer}></i>
        <div className="logo" onClick={() => navigate("/")}>
          <a href="#">BetApp</a>
        </div>
        <div className={`nav-links ${drawerOpen ? "open" : ""}`}>
          <div className="sidebar-logo">
            <span className="logo-name fw-bold">BetApp</span>
            <i className="bx bx-x" onClick={toggleDrawer}></i>
          </div>
          <ul className="links">
            <li>
              <Link to="/">
                {" "}
                <a onClick={toggleDrawer} href="#">
                  Home
                </a>
              </Link>
            </li>
            {/* <li>
              <a
                href="#"
                onClick={() => setShowHtmlCssSubMenu(!showHtmlCssSubMenu)}
              >
                Sports
              </a>
              <i
                className="bx bxs-chevron-down htmlcss-arrow arrow"
                onClick={() => setShowHtmlCssSubMenu(!showHtmlCssSubMenu)}
              ></i>

              {showHtmlCssSubMenu && (
                <ul className="htmlCss-sub-menu sub-menu">
                 
                  {uniqueGroups?.map((group, index) => (
                    <li onClick={() => navigate(`/title/${group}`)} key={index}>
                      <a href="#">{group}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li> */}

            <li>
              <a href="#" onClick={() => setShowJsSubMenu(!showJsSubMenu)}>
                Odds
              </a>
              <i
                className="bx bxs-chevron-down js-arrow arrow"
                onClick={() => setShowJsSubMenu(!showJsSubMenu)}
              ></i>
              {showJsSubMenu && (
                <ul className="htmlCss-sub-menu sub-menu">
                  {data?.map((group, index) => (
                    <li
                      className="border-bottom"
                      onClick={() => {
                        navigate(`/odds/${group.key}`);
                        toggleDrawer();
                      }}
                      key={index}
                    >
                      <a href="#">{group.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <a
                href="#"
                onClick={() => setShowHtmlCssSubMenu(!showHtmlCssSubMenu)}
              >
                Resources
              </a>
              <i
                className="bx bxs-chevron-down htmlcss-arrow arrow"
                onClick={() => setShowHtmlCssSubMenu(!showHtmlCssSubMenu)}
              ></i>

              {showHtmlCssSubMenu && (
                <ul className="htmlCss-sub-menu sub-menu">
                  {/* style dropdown bttun */}
                  <li
                    className="border-bottom"
                    onClick={() => {
                      navigate(`/odds-calculater`);
                      toggleDrawer();
                    }}
                  >
                    <a href="#">Odds Calculator</a>
                  </li>
                  <li
                    className="border-bottom"
                    onClick={() => {
                      navigate(`/parlay-calculater`);
                      toggleDrawer();
                    }}
                  >
                    <a href="#">Parlay Calculator</a>
                  </li>
                  <li
                    onClick={() => {
                      navigate(`/hedge-calculater`);
                      toggleDrawer();
                    }}
                  >
                    <a href="#">Hedge Calculator</a>
                  </li>
                  <li
                    onClick={() => {
                      navigate(`/ev-calculater`);
                      toggleDrawer();
                    }}
                  >
                    <a href="#">EV Calculator</a>
                  </li>
                </ul>
              )}
            </li>
            {/* <li onClick={() => navigate("/betting-history")}>
              <a onClick={toggleDrawer} href="#">
                Betting History
              </a>
            </li> */}
            <li onClick={() => navigate(token ? "/leagues-list" : "/login")}>
              <a onClick={toggleDrawer} href="#">
                Leagues
              </a>
            </li>
            <li onClick={() => navigate(token ? "/challanges" : "/login")}>
              <a onClick={toggleDrawer} href="#">
                Challenges
              </a>
            </li>
            <li onClick={() => navigate("/notification")}>
              <a onClick={toggleDrawer} href="#">
                <FaBell size={18} />
              </a>
            </li>

            {token ? (
              <li
                className="username-main"
                onClick={() => {
                  navigate("/profile");
                  toggleDrawer();
                }}
              >
                <span className="username">{formatCapital(userName)}</span>
              </li>
            ) : (
              <li>
                <Link to="/login">
                  {" "}
                  <a onClick={toggleDrawer} href="#">
                    LOGIN
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
        {/* <div className="search-box">
          <i className="bx bx-search" onClick={toggleSearchInput}></i>
          {showSearchInput && (
            <div className="input-box">
              <input type="text" className="bg-dark" placeholder="Search..." />
            </div>
          )}
        </div> */}
      </div>
    </nav>
  );
};

export default Header;
// >>>>>>>>>>>>>>>>>>>>>>>>> Above CODE IS WORKING >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
