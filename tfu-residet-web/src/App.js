import React, { useCallback, useContext } from "react";
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
import { routeArray, routeResident, routeDirector, routeAccountant, routeAdmin, routeThirdParty, routeTechnique } from "./constants/routes";
import LoginBuilding from "./pages/LoginBuilding";
import { authService } from "./services/authService";
import Cookies from 'js-cookie';
import DynamicBreadcrumbs from "./common/Breadcrumbs";

function App() {
  const { user } = useContext(authService);
  
  const getRoutesByRole = useCallback((role) => {
    switch (role) {
      case 'Resident': return routeResident;
      case 'BanQuanLy': return routeDirector;
      case 'KeToan': return routeAccountant;
      case 'BenThuBa': return routeThirdParty;
      case 'HanhChinh': return routeAdmin;
      case 'KiThuat': return routeTechnique;
      default: return routeArray;
    }
  }, [user]);
  
  const routes = getRoutesByRole(!user ? Cookies.get('role') : user);

  const renderRoutes = (routeList, parentPath = '') => {
    return routeList.map((item) => {
      const fullPath = `${parentPath}${item.route}`.replace(/\/+/g, '/');
      return (
        <Route
          key={fullPath}
          path={fullPath}
          element={item.component}
        >
          {item.routeChild && renderRoutes(item.routeChild, fullPath)}
        </Route>
      );
    });
  };

  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TFU Resident - CMS</title>
      </Helmet>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login-building/:buildingId" element={<LoginBuilding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp/:id" element={<OTPInput />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/*"
            element={
              <>
                <Sidebar routes={routes.filter(route => !route.hidden)} />
                <div className="main-content">
                  <Header />
                  <DynamicBreadcrumbs routes={routes} />
                  <Routes>
                    {renderRoutes(routes)}
                  </Routes>
                </div>
                {/*<PostNews/>*/}
                {/*<Dashboard/>*/}
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
