import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import Cookies from 'js-cookie';

const BUILDING_HOST = 'localhost'; // tạm chưa có server
const PRODUCT_HOST = 'vibrant-gates.202-92-7-204.plesk.page';
const PrivateRoute = () => {
    const isAuthenticated = Cookies.get("accessToken");
    return !!isAuthenticated ? <Outlet/> : window.location.hostname !== BUILDING_HOST ?
        <Navigate to={`/login-building/` + Cookies.get('buildingID')}/> : <Navigate to="/login"/>;
};

export default PrivateRoute;