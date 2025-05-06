import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProducts.css";
const { VITE_API_URL } = import.meta.env;

export default function CategoryProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${VITE_API_URL}/products/search?category_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando productos...</p>;
  if (!products.length) return <p>No hay productos en esta categoría.</p>;

  return (
    <div>
      <h2>Productos de la categoría</h2>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => navigate(`/producto/${product.id}`)} style={{ cursor: "pointer" }}>
            <img src={`${VITE_API_URL}/uploads/${product.photo}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}
