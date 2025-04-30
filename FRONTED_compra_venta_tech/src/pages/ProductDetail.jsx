//Página de detalle artículo

import "../styles/ProductDetail.css"; // Estilos separados
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiImage from "../components/Post/ApiImage";

const { VITE_API_URL } = import.meta.env;
console.log("VITE_API_URL:", VITE_API_URL);
const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();

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

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <div className="product-detail-image">
          <ApiImage name={product.photo} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <p className="price">{product.price} €</p>
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <p className="locality">📍 {product.locality}</p>
          <p className="category">📂 {product.category_name}</p>
          <button className="contact-btn">Solicitar compra</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
