import { Navigate } from "react-router-dom"

export default function PrivatePag() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return;
}