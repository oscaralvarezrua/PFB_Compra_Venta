import React from "react";
import "../styles/userMenu.css";
import useUserData from "../hooks/useUserData";

export default function RequestsList() {
  const { userData } = useUserData();

  return <h2>Solicitudes</h2>;
}
