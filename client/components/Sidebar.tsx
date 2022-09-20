import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarProps } from '../Types';

const Sidebar = (props: SidebarProps) => {
  const { menuOpen, setMenuOpen } = props;

  const toggleMenu = () => {
    setMenuOpen(menuOpen ? false : true);
  };

  return (
    <nav id={menuOpen ? 'sidebar' : 'sidebar-closed'}>
      {menuOpen ? (
        <img
          id="close-menu-icon"
          src="./assets/close-menu-icon.png"
          alt=""
          onClick={toggleMenu}
        />
      ) : (
        <img
          id="open-menu-icon"
          src="./assets/open-menu-icon.png"
          alt=""
          onClick={toggleMenu}
        />
      )}
      <Link to="">
        <img
          id={menuOpen ? 'logo' : 'logo-menu-closed'}
          src="./assets/logo-hat.png"
          alt=""
        />
      </Link>
      <ul id="sidebar-list">
        <li>
          <Link to="/">
            <div className="sidebar-page-container">
              <img
                className={menuOpen ? 'sidebar-icon' : 'sidebar-icon-closed'}
                src="./assets/ns-icon.png"
              />
              {menuOpen ? (
                <span className="sidebar-names">Namespace</span>
              ) : null}
            </div>
          </Link>
        </li>
        <li>
          <Link to="/home">
            <div className="sidebar-page-container">
              <img
                className={menuOpen ? 'sidebar-icon' : 'sidebar-icon-closed'}
                src="./assets/dashboard-icon.png"
              />
              {menuOpen ? (
                <span className="sidebar-names">Dashboard</span>
              ) : null}
            </div>
          </Link>
        </li>
        <li>
          <Link to="/analysis">
            <div className="sidebar-page-container">
              <img
                className={menuOpen ? 'sidebar-icon' : 'sidebar-icon-closed'}
                src="./assets/analysis-icon.png"
              />
              {menuOpen ? (
                <span className="sidebar-names">Analysis</span>
              ) : null}
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
