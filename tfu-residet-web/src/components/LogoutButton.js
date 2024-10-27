import React from 'react';
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const handleLogout = () => {
     Cookies.remove('accessToken');
    window.location.href = '/login'; // hoặc sử dụng React Router
  };

  return (
    <button onClick={handleLogout} style={{ 
        position: 'absolute',
        right: '10px',
        top: '10px', 
        display: 'inline-block', 
        padding: '5px 10px', 
        backgroundColor: 'green', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px',
        zIndex: 1 
        }}>
      Đăng xuất
    </button>
  );
};

export default LogoutButton;