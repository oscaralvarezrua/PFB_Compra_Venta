import React from "react";
import "../styles/userMenu.css";
import useUserData from "../hooks/useUserData";

export default function BuysList() {
  const { userData } = useUserData();

  return <h2>Compras</h2>;
}
