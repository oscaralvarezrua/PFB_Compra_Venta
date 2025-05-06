//Página de detalle artículo

import "../styles/ProductDetail.css"; // Estilos separados
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiImage from "../components/Post/ApiImage";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;
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
  }, [productId]);

  const handleClickBuy = async (id, name) => {
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
      setSubmitMessage(err.message || "Error al iniciar la compra, inténtelo de nuevo.");
    }
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <div className="seller-header">
          <img src={product.seller_avatar ? `${VITE_API_URL}/uploads/${product.seller_avatar}` : "/default-avatar.png"} alt={product.seller_name} className="seller-avatar" />
          <div>
            <strong>{product.seller_name}</strong>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: i < Math.round(product.avg_rating) ? "#e7c61b" : "#ccc" }}>
                  ★
                </span>
              ))}
            </div>
            <span>{product.sales_count} ventas</span>
            <a href={`/usuario/${product.seller_id}/valoraciones`} style={{ color: "#e7c61b", marginLeft: 8 }}>
              {product.reviews_count} valoración{product.reviews_count !== 1 ? "es" : ""}
            </a>
          </div>
        </div>
        <div className="product-detail-image">
          <ApiImage name={product.photo} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <p className="price">{product.price} €</p>
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <p className="locality">📍 {product.locality}</p>
          <p className="category">📂 {product.category_name}</p>
          <button className="contact-btn" onClick={() => handleClickBuy(product.id, product.name)}>
            Solicitar compra
          </button>
        </div>
      </div>
      {submitMessage && <p className={`feedback-message ${submitMessage.includes("✅") ? "success" : "error"}`}>{submitMessage}</p>}
    </div>
  );
};

export default ProductDetail;
