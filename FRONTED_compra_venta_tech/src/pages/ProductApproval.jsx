import React, { useEffect, useState } from "react";
import ApiImage from "../components/Post/ApiImage";
import "../styles/ProductApproval.css";

const { VITE_API_URL } = import.meta.env;

const ProductApproval = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/products?is_accepted=false`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data.status === "error") throw new Error(data.message);
        setProducts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingProducts();
  }, []);

  const handleApprove = async (productId) => {
    try {
      const res = await fetch(`${VITE_API_URL}/products/${productId}/accept`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.status === "error") throw new Error(data.message);

      // Actualizar la lista de productos
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (productId) => {
    try {
      const res = await fetch(`${VITE_API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.status === "error") throw new Error(data.message);

      // Actualizar la lista de productos
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Cargando productos pendientes...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="validate-products-page">
      <h2>Productos pendientes de validación</h2>
      {products.length === 0 ? (
        <p className="no-products">No hay productos pendientes de validación.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <ApiImage name={product.photo} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">{product.price}€</p>
                <p className="description">{product.description}</p>
                <div className="seller-info">
                  <p>Vendedor: {product.seller?.username}</p>
                </div>
                <div className="validation-buttons">
                  <button className="validate-button accept" onClick={() => handleApprove(product.id)}>
                    Aprobar
                  </button>
                  <button className="validate-button reject" onClick={() => handleReject(product.id)}>
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductApproval;