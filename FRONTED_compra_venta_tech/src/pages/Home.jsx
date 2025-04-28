import React, { useState, useEffect } from "react";
import Slider from "../components/Slider/Slider";
import { getProducts } from "../services/ProductServices"; 
import "../styles/home.css";

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts("recent");
        setNewProducts(products); 
      } catch (error) {
        console.error("Error cargando productos", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="main-container">
      <section className="w-full max-w-7xl mb-10">
        <Slider />
      </section>

      {/* Novedades */}
      <section className="w-full max-w-7xl mb-10">
        <h2 className="novedades-title">Novedades</h2>
        <p className="novedades-text">
          En esta sección verás las últimas novedades, los productos más
          recientes ¡para que no se te escape nada!
        </p>
        <button className="novedades-btn">
          Ver todo
        </button>

        {/* Slider de productos recientes */}
        <div className="product-slider">
          {newProducts.slice(0, 3).map((product) => (
            <div key={product.id} className="product-slider-item">
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
              <h3>{product.name}</h3>
            </div>
          ))}
          {/* Flechas de navegación */}
          <button className="slider-arrow arrow-left">◀</button>
          <button className="slider-arrow arrow-right">▶</button>
        </div>
      </section>

      {/* Más buscados */}
      <section className="w-full max-w-7xl mb-10">
      <h2 className="buscados-title">Más buscados</h2>
      <p className="buscados-text">
      ¿No sabes qué quieres? Echa un vistazo a los más buscados
        </p>
        <button className="buscados-btn">
          Ver todo
        </button>
      </section>
    </main>
  );
};

export default Home;
