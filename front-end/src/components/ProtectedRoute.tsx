import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// Define a type for your user object
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user"
}

interface ProtectedRouteProps {
  allowedRoles?: Array<User["role"]>; // optional prop to allow specific roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"]); // typed user

  console.log("Protected Route Debugging:", user?.role);

  // No user logged in
  if (!user || !user.role) return <Navigate to="/login" replace />;

  // If allowedRoles provided, check if user's role is included
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise, user is allowed
  return <Outlet />;
};

export default ProtectedRoute;
