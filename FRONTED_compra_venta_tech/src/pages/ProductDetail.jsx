//Página de detalle artículo

import "../styles/ProductDetail.css"; // Estilos separados
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiImage from "../components/Post/ApiImage";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Rating from "../components/Rating/Rating";

const { VITE_API_URL, VITE_USER_ICON } = import.meta.env;
console.log("VITE_API_URL:", VITE_API_URL);
const ProductDetail = () => {
  const { token } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/products/${productId}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener el producto");
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, product?.visits]);

  const handleClickBuy = async (id, name) => {
    if (!token) {
      setSubmitMessage(
        "Debes iniciar sesión para solicitar la compra de un producto."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSubmitMessage("¡Solicitud de compra iniciada correctamente! ✅");
      setTimeout(() => {
        navigate("/user/buys-list");
      }, 2000);
    } catch (err) {
      setSubmitMessage(
        err.message || "Error al iniciar la compra, inténtelo de nuevo."
      );
    }
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <div className="seller-header">
          <Link to={`/usuarios/${product.seller_id}`} className="user-link">
            <ApiImage
              name={
                product?.seller_avatar ? product?.seller_avatar : VITE_USER_ICON
              }
              alt=""
              className="seller-avatar"
            />
            <div className="seller-details">
              <strong>{product.seller_name}</strong>
              <div>
                <Rating className="rating" value={product.avg_rating} />
              </div>
              <div className="sales-and-reviews">
                <span>{product.sales_count} ventas </span>
                <span className="review-count">
                  {product.reviews_count} valoracion
                  {product.reviews_count !== 1 ? "es" : ""}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="product-detail-image">
          <ApiImage name={product.photo} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <div className="product-top-info">
            <p className="price">{product.price} €</p>
            <div className="visits">
              <img
                src="/src/assets/eye.png"
                alt="visitas"
                className="visits-icon"
              />
              <span className="visits-count">{product.visits}</span>
            </div>
          </div>

          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <p className="locality">📍 {product.locality}</p>
          <p className="category">📂 {product.category_name}</p>
          <button
            className="contact-btn"
            onClick={() => handleClickBuy(product.id, product.name)}
          >
            Solicitar compra
          </button>
        </div>
      </div>
      <div className="submit-message">
        {submitMessage && (
          <p
            className={`feedback-message ${
              submitMessage.includes("✅") ? "success" : "error"
            }`}
          >
            {submitMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
