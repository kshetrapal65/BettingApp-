import React, { useState } from "react";
import "../Header.css"; // Ensure this path is correct
import SportList from "../../JSON/SportList";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showHtmlCssSubMenu, setShowHtmlCssSubMenu] = useState(false);
  const [showJsSubMenu, setShowJsSubMenu] = useState(false);
  const navigate = useNavigate();

  const [showMoreSubMenu, setShowMoreSubMenu] = useState(false);
  const data = SportList;
  console.log("DATA", data);

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

  return (
    <nav className="navbar">
      <div className="navbar">
        <i className="bx bx-menu" onClick={toggleDrawer}></i>
        <div className="logo">
          <a href="#">Logo</a>
        </div>
        <div className={`nav-links ${drawerOpen ? "open" : ""}`}>
          <div className="sidebar-logo">
            <span className="logo-name">Logo</span>
            <i className="bx bx-x" onClick={toggleDrawer}></i>
          </div>
          <ul className="links">
            <li>
              <Link to="/">
                {" "}
                <a href="#">HOME</a>
              </Link>
            </li>
            <li>
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
                  {/* <li>
                    <a href="#">Neumorphism</a>
                  </li>
                  <li>
                    <a href="#">Neumorphism</a>
                  </li>{" "}
                  <li>
                    <a href="#">Neumorphism</a>
                  </li>
                  <li className="more">
                    <span onClick={() => setShowMoreSubMenu(!showMoreSubMenu)}>
                      <a href="#">More</a>
                      <i className="bx bxs-chevron-right arrow more-arrow"></i>
                    </span>
                    {showMoreSubMenu && (
                      <ul className="more-sub-menu sub-menu">
                        <li>
                          <a href="#">Neumorphism</a>
                        </li>
                        <li>
                          <a href="#">Pre-loader</a>
                        </li>
                        <li>
                          <a href="#">Glassmorphism</a>
                        </li>
                      </ul>
                    )}
                  </li> */}
                  {uniqueGroups?.map((group, index) => (
                    <li onClick={() => navigate(`/title/${group}`)} key={index}>
                      <a href="#">{group}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

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
                      onClick={() => navigate(`/odds/${group.key}`)}
                      key={index}
                    >
                      <a href="#">{group.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <a href="#">ABOUT US</a>
            </li>
            <li>
              <a href="#">CONTACT US</a>
            </li>
            <li>
              <Link to="/register">
                {" "}
                <a href="#">LogIn</a>
              </Link>
            </li>
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
