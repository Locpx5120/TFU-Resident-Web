import React from 'react';
import '../styles/Header.css';
import LogoutButton from "../components/LogoutButton";

const Header = () => {
  return (
    <header className="header">
      <div className="user-info">
        <h2>Hệ thống Quản lý Tòa nhà TFU</h2>
        {/* <img src="vietnam-flag.png" alt="Vietnam Flag" className="flag" /> */}
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;