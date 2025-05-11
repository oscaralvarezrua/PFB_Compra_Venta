import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ApiImage from "../components/Post/ApiImage";
import Rating from "../components/Rating/Rating";
import { useAuth } from "../hooks/useAuth";
import "../styles/ProductDetail.css";

const { VITE_API_URL, VITE_USER_ICON } = import.meta.env;

const ProductDetail = () => {
  const { token } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${VITE_API_URL}/products/${productId}`);
        if (!res.ok) throw new Error("No se pudo obtener el producto");
        const { data } = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleClickBuy = async (id, name) => {
    if (!token) {
      setSubmitMessage("Debes iniciar sesión para solicitar la compra.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
    try {
      const res = await fetch(`${VITE_API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id, productName: name }),
      });

      const body = await res.json();

      if (!res.ok) throw new Error(body.message || "Error en la compra");
      setSubmitMessage("¡Solicitud de compra iniciada correctamente! ✅");
      setTimeout(() => navigate("/user/buys-list"), 2000);
    } catch (err) {
      setSubmitMessage(err.message || "Error al iniciar la compra.");
    }
  };

  if (loading) return <p>Cargando producto…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  const priceNum = parseFloat(product.price) || 0;

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        {/* Seller header */}
        <div className="seller-header">
          <Link to={`/usuarios/${product.seller_id}`} className="user-link">
            <ApiImage
              name={product.seller_avatar || VITE_USER_ICON}
              alt={product.seller_name}
              className="seller-avatar"
            />
            <div className="seller-details">
              <strong>{product.seller_name}</strong>
              <Rating value={product.avg_rating} />
              <div className="sales-and-reviews">
                <span>{product.sales_count} ventas</span>
                <span className="review-count">
                  {product.reviews_count} valoracion
                  {product.reviews_count !== 1 ? "es" : ""}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Product image */}
        <div className="product-detail-image">
          <ApiImage name={product.photo} alt={product.name} />
          <div className="visits-under-image">
            <img
              src="/src/assets/eye.png"
              alt="Visitas"
              className="visits-icon"
            />
            <span className="visits-count">{product.visits}</span>
          </div>
        </div>

        {/* Product info */}
        <div className="product-detail-info">
          <div className="product-top-info">
            <p className="price">€ {priceNum.toFixed(2)}</p>
          </div>

          <h2 className="pd-title">{product.name}</h2>
          <p className="description">{product.description}</p>
          <p className="locality">📍 {product.locality}</p>
          <p className="category">
            {" "}
            📂{" "}
            <Link
              to={`/filtrados?category_id=${product.category_id}`}
              className="category-link"
            >
              {product.category_name}
            </Link>
          </p>
          <button
            className="contact-btn"
            onClick={() => handleClickBuy(product.id, product.name)}
          >
            Solicitar compra
          </button>
        </div>
      </div>

      {submitMessage && (
        <div className="submit-message">
          <p
            className={`feedback-message ${
              submitMessage.includes("✅") ? "success" : "error"
            }`}
          >
            {submitMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
