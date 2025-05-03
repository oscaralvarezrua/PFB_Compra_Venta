import React from "react";
import "../styles/userMenu.css";
import useUserData from "../hooks/useUserData";

export default function SalesList() {
  const { userData } = useUserData();

  return <h2>Ventas</h2>;
}
