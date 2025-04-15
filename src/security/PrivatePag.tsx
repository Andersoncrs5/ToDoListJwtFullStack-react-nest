import { Navigate, useNavigate } from "react-router-dom"

export default function PrivatePag() {
  const nav = useNavigate();

  const token: string | null = localStorage.getItem("token");

  if (token == null) {
      nav('/home');
  }
}