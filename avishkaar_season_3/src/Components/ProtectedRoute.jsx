import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = jwtDecode(token); // ✅ Decode token payload
  } catch (err) {
    console.error("Invalid token:", err);
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
