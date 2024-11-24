import React from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

const findBreadcrumbs = (pathParts, routes) => {
  let currentRoutes = routes;
  const breadcrumbs = [];

  for (let part of pathParts) {
    const match = currentRoutes.find((route) => route.route.replace(/^\//, '') === part);
    if (match) {
      breadcrumbs.push(match);
      currentRoutes = match.routeChild || [];
    } else {
      break; // Ngừng tìm kiếm nếu không có match
    }
  }

  return breadcrumbs;
};

const DynamicBreadcrumbs = ({ routes }) => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = findBreadcrumbs(pathParts, routes);

  return (
    <div className="containerr">
    <Breadcrumbs aria-label="breadcrumb">
      <Link to="/" underline="hover" color="#2e8b57" style={{textDecoration: 'none'}}>
        Home
      </Link>
      {breadcrumbs.map((breadcrumb, index) => {
        // const isLast = index === breadcrumbs.length - 1;
        const path = breadcrumbs.slice(0, index + 1).map(b => b.route).join("");

        return <Link key={path} to={breadcrumb.route} underline="hover" color="#2e8b57" style={{textDecoration: 'none'}}>
            {breadcrumb.routeName}
          </Link>
      })}
    </Breadcrumbs>
    </div>
  );
};

export default DynamicBreadcrumbs;
