import React from "react";
import { Link } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import ApiImage from "../components/Post/ApiImage";
import "../styles/UserProfileView.css";

const UserProfileView = () => {
  const { userData, loading, error } = useUserData();

  // Depuración
  console.log("userData:", userData, "loading:", loading, "error:", error);

  if (loading) return <div className="loading">Cargando perfil...</div>;
  if (error) return <div className="error">Error al cargar el perfil: {error}</div>;
  if (!userData) return <div className="error">No se encontraron datos de usuario.</div>;

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <ApiImage name={userData?.avatar} alt="Foto de perfil" className="profile-avatar" />
        </div>
        <div className="profile-info">
          <h1>{userData?.username}</h1>
          <p className="biography">{userData?.biography}</p>
          <div className="stats">
            <div className="stats">
              <Link to="/user/products-list" className="stat-link">
                <div className="stat-item">
                  <span className="stat-value">{userData?.stats?.total_products || 0}</span>
                  <span className="stat-label">Productos</span>
                </div>
              </Link>
              <Link to="/user/sales-list" className="stat-link">
                <div className="stat-item">
                  <span className="stat-value">{userData?.stats?.total_sales || 0}</span>
                  <span className="stat-label">Ventas</span>
                </div>
              </Link>
              <Link to="/user/buys-list" className="stat-link">
                <div className="stat-item">
                  <span className="stat-value">{userData?.stats?.total_purchases || 0}</span>
                  <span className="stat-label">Compras</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <Link to="/user/edit" className="edit-profile-button">
          Mis datos
        </Link>
      </div>

      <div className="profile-sections">
        <section className="sales-section">
          <h2>Ventas realizadas</h2>
          <div className="sales-list">
            {}
            <p>No hay ventas realizadas aún</p>
          </div>
        </section>

        <section className="ratings-section">
          <h2>Valoraciones</h2>
          <div className="ratings-list">
            {}
            <p>No hay valoraciones aún</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfileView;
