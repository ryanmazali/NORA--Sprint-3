import { Navigate, Outlet } from "react-router";

export const PrivateRoutes = () => {
  const token = JSON.parse(sessionStorage.getItem("nora_token") || "null");

  return token ? <Outlet /> : <Navigate to="/login" />;
};
