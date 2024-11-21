import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Helmet } from "react-helmet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import PublicRoute from './common/PublicRoute';
import PrivateRoute from './common/PrivateRoute';
import OTPInput from './pages/OTPInput';
import ChangePassword from './pages/ChangePassword';
import { routeArray, routeResident, routeDirector, routeReceptionist, routeAccountant, routeAdmin } from "./constants/routes";
import LoginBuilding from "./pages/LoginBuilding";

function App() {
  // Giả sử bạn có một hàm hoặc hook để lấy vai trò của người dùng
  // const userRole = getUserRole();

  const getRoutesByRole = (role) => {
    switch (role) {
      case 'Resident':
        return routeResident;
      case 'Building Director':
        return routeDirector;
      case 'Accountant':
        return routeAccountant;
      case 'Administrator':
        return routeAdmin;
      default:
        return routeArray;
    }
  };

  const routes = getRoutesByRole('Resident');

  const renderRoutes = (routeList, parentPath = '') => {
    return routeList.map((item) => {
      const fullPath = `${parentPath}${item.route}`.replace(/\/+/g, '/');
      
      if (item.routeChild) {
        return (
          <React.Fragment key={fullPath}>
            <Route path={fullPath} element={item.component} />
            {renderRoutes(item.routeChild, fullPath)}
          </React.Fragment>
        );
      }
      
      return (
        <Route
          key={fullPath}
          path={fullPath}
          element={item.component}
        />
      );
    });
  };

  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TFU Resident - CMS</title>
        <meta
          name="description"
          content="Chuyển đổi số mô hình quản lý-Thông tin dữ liệu chung cư-căn hộ,cư dân;Số hóa phiếu thu, thông báo phí, thanh toán online; Tương tác hai chiều; Đặt dịch vụ, tiện ích (đánh giá chất lượng); Truyền thông cư dân; Sổ tay cư dân, danh bạ,…;Khách thăm &amp; kiểm soát ra vào."
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login-building/:buildingId" element={<LoginBuilding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp/:id" element={<OTPInput />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/*"
            element={
              <>
                <Sidebar routes={routes.filter(route => !route.hidden)} />
                <div className="main-content">
                  <Header />
                  <Routes>
                    {renderRoutes(routes)}
                  </Routes>
                </div>
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;