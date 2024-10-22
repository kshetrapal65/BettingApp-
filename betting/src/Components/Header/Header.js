import React, { useState } from "react";
import "../Header.css"; // Ensure this path is correct

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showHtmlCssSubMenu, setShowHtmlCssSubMenu] = useState(false);
  const [showJsSubMenu, setShowJsSubMenu] = useState(false);
  const [showMoreSubMenu, setShowMoreSubMenu] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <nav>
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
              <a href="#">HOME</a>
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
                  <li>
                    <a href="#">Web Design</a>
                  </li>
                  <li>
                    <a href="#">Login Forms</a>
                  </li>
                  <li>
                    <a href="#">Card Design</a>
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
                  </li>
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
                <ul className="js-sub-menu sub-menu">
                  <li>
                    <a href="#">Dynamic Clock</a>
                  </li>
                  <li>
                    <a href="#">Form Validation</a>
                  </li>
                  <li>
                    <a href="#">Card Slider</a>
                  </li>
                  <li>
                    <a href="#">Complete Website</a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a href="#">ABOUT US</a>
            </li>
            <li>
              <a href="#">CONTACT US</a>
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
