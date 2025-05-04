//Mi perfil
import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/userMenu.css";

import BuysList from "./BuysList";
import SalesList from "./SalesList";
import ProductsList from "./ProductsList";
import RequestList from "./RequestsList";
import UserDataAndChangePass from "./UserDataAndChangePass";
import useUserData from "../hooks/useUserData";
import useAverageRating from "../hooks/useAverageRating";
import ApiImage from "../components/Post/ApiImage";
import Rating from "../components/Rating/Rating";

export default function UserMenu() {
  const { userData } = useUserData();
  const { averageUserRating, numberOfRatings } = useAverageRating();

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
              <div className="current-avatar-menu">
                <ApiImage
                  name={userData?.avatar}
                  alt=""
                  className="profile-image-menu"
                />
              </div>
              <div className="menu-rating">
                <span>
                  <strong>{userData?.username}</strong>
                </span>
                <Rating
                  className="rating"
                  value={averageUserRating}
                  count={numberOfRatings}
                />
                <span className="menu-date">
                  En SegundaTec desde{" "}
                  {new Date(userData?.created_at).getFullYear()}
                </span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/buys-list"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <img
                src="/src/assets/icono_compras.png"
                alt=""
                className="menu-link__icon"
              />
              <span>Compras</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/sales-list"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <img
                src="/src/assets/icono_ventas.png"
                alt=""
                className="menu-link__icon"
              />
              <span>Ventas</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/products-list"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <img
                src="/src/assets/icono_productos.png"
                alt=""
                className="menu-link__icon"
              />
              <span>Productos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/requests-list"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <img
                src="/src/assets/icono_solicitudes.png"
                alt=""
                className="menu-link__icon"
              />
              <span>Solicitudes</span>
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
