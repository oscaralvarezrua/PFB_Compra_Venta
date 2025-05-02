import React from "react";
import "../styles/userMenu.css";
import useUserData from "../hooks/useUserData";

export default function ProductsList() {
  const { userData } = useUserData();

  return <h2>Tus Productos</h2>;
}
