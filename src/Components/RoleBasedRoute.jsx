import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleBasedRoute = ({ userRole, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === "admin") {
      navigate("/admin/dashboard"); // Redirect for admin
    } else if (userRole !== "admin") {
      navigate("/dashboard"); // Redirect for non-admin
    }
  }, [userRole, navigate]); // Add dependencies to ensure effect runs when userRole changes

  return children; // Render the children (the actual route's component)
};

export default RoleBasedRoute;
