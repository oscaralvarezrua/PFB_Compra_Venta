//Mi perfil
import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../styles/userMenu.css";

import BuysList from "./BuysList";
import SalesList from "./SalesList";
import ProductsList from "./ProductsList";
import RequestList from "./RequestsList";
import UserDataAndChangePass from "./UserDataAndChangePass";
import useUserData from "../hooks/useUserData";

export default function UserMenu() {
  const { userData } = useUserData();
  return (
    <div className="user-menu">
      <aside className="sidebar">
        <ul>
          <li>
            <NavLink
              to="/user"
              end
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              Mi perfil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/buys-list"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              Compras
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/sales-list"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              Ventas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/products-list"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/requests-list"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              Solicitudes
            </NavLink>
          </li>
        </ul>
      </aside>
      <main className="content-profile">
        <Routes>
          <Route index element={<UserDataAndChangePass />} />
          <Route path="buys-list" element={<BuysList />} />
          <Route path="sales-list" element={<SalesList />} />
          <Route path="products-list" element={<ProductsList />} />
          <Route path="requests-list" element={<RequestList />} />
        </Routes>
      </main>
    </div>
  );
}
