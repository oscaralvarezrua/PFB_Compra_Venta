import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiImage from "../components/Post/ApiImage";
import "../styles/UserProfileView.css";
import Rating from "../components/Rating/Rating";
const { VITE_API_URL } = import.meta.env;

const UserProfile = () => {
  const [userData, seUserData] = useState(null);
  const [stats, setStatsList] = useState(null);
  const [salesList, setSalesData] = useState(null);
  const [buysList, setBuysData] = useState(null);
  const [prodList, setProdData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pordIsActive, setProdActiveData] = useState(false);
  const [salesIsActive, setSalesActiveData] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/users/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener información del usuario");
        }
        const data = await response.json();

        seUserData(data?.data.usuario);
        setSalesData(data?.data.historico_ventas);
        setBuysData(data?.data.historico_compras);
        setStatsList(data?.data.stats[0]);
        setProdData(data?.data.productos);
        console.log(data?.data.productos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Cargando perfil...</div>;
  if (error)
    return <div className="error">Error al cargar el perfil: {error}</div>;
  if (!userData)
    return <div className="error">No se encontraron datos de usuario.</div>;

  const handleClickProd = () => {
    setProdActiveData(true);
    setSalesActiveData(false);
  };
  const handleClickSales = () => {
    setSalesActiveData(true);
    setProdActiveData(false);
  };
  const handleClickBuys = () => {
    setProdActiveData(false);
    setSalesActiveData(false);
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <ApiImage
            name={userData?.avatar}
            alt="Foto de perfil"
            className="profile-avatar"
          />
        </div>
        <div className="profile-info">
          <h1>{userData?.username}</h1>
          <Rating
            className="rating"
            value={stats.average_ratings}
            count={stats.total_ratings}
          />
          <p className="biography">{userData?.biography}</p>
          <div className="stats">
            <div className="stats">
              <button className="stat-item" onClick={() => handleClickProd()}>
                <div className="stat-item">
                  <span className="stat-value">
                    {stats.total_products || 0}
                  </span>
                  <span className="stat-label">Productos</span>
                </div>
              </button>

              <button className="stat-item" onClick={() => handleClickSales()}>
                <div className="stat-item">
                  <span className="stat-value">{salesList?.length || 0}</span>
                  <span className="stat-label">Ventas</span>
                </div>
              </button>
              <button className="stat-item" onClick={() => handleClickBuys()}>
                <div className="stat-item">
                  <span className="stat-value">
                    {stats?.total_purchases || 0}
                  </span>
                  <span className="stat-label">Compras</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <section className="ratings-section">
          <h2>Valoraciones</h2>

          <div className="ratings-list">
            {stats.total_ratings > 0 ? (
              <div>
                {salesList
                  ?.filter((sale) => sale.ratings)
                  .map((sale) => (
                    <li key={sale.transaction_id} className="request-item">
                      <div className="request-text">
                        <p>{sale.producto} </p>
                      </div>
                      <div className="request-text">
                        <p>
                          <strong>Valoración</strong>{" "}
                        </p>
                        <Rating
                          className="rating"
                          value={sale.ratings}
                          count={sale.ratings}
                        />
                        <p>{sale.comment} </p>
                      </div>
                      <div></div>
                    </li>
                  ))}
              </div>
            ) : (
              <p>No hay valoraciones aún</p>
            )}
          </div>
        </section>
        <section className="ratings-section">
          {salesIsActive ? (
            <div>
              <h2>Ventas</h2>
              {salesList.map((sale) => (
                <li key={sale.transaction_id} className="request-item">
                  <div className="user-profile-image">
                    <ApiImage
                      name={sale.photo}
                      alt={sale.name}
                      className="user-profile-image"
                    />
                  </div>
                  <div className="request-text">
                    <p>{sale.producto} </p>
                  </div>
                </li>
              ))}
            </div>
          ) : pordIsActive && !salesIsActive ? (
            <div>
              <h2>Productos</h2>
              {prodList?.map((prod, i) => (
                <li key={i} className="request-item">
                  <div className="user-profile-image">
                    <ApiImage
                      name={prod.photo}
                      alt={prod.name}
                      className="user-profile-image"
                    />
                  </div>
                  <div className="request-text">
                    <p>{prod.name} </p>
                  </div>
                  <div className="request-text">
                    <p>{prod.price} €</p>
                  </div>
                </li>
              ))}
            </div>
          ) : (
            <div>
              <p>Compras</p>
              {buysList.map((buy) => (
                <li key={buy.transaction_id} className="request-item">
                  <div className="user-profile-image">
                    <ApiImage
                      name={buy.photo}
                      alt={buy.name}
                      className="user-profile-image"
                    />
                  </div>
                  <div className="request-text">
                    <p>{buy.producto} </p>
                  </div>

                  <div></div>
                </li>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
