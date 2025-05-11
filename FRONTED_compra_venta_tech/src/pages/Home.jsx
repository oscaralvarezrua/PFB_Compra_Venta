// Página principal
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import { getProducts } from "../services/ProductServices";
import "../styles/home.css";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const { token } = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const products = await getProducts(token, "created_at");
        setNewProducts(products);
      } catch (error) {
        console.error("Error cargando productos recientes", error);
      }
    };

    const fetchPopularProducts = async () => {
      try {
        const products = await getProducts(token, "visits");
        setPopularProducts(products);
      } catch (error) {
        console.error("Error cargando productos populares", error);
      }
    };

    fetchNewProducts();
    fetchPopularProducts();
  }, []);

  // const irAFiltros = () => {
  // navigate("/filtrados");
  // };

  return (
    <main className="main-container">
      {/* Slider de cabecera */}
      <section className="w-full max-w-7xl mb-10">
        <Slider />
      </section>

      {/* Botón para ir a filtros, bien visible 
      <div className="filtros-btn-wrapper">
        <button onClick={irAFiltros} className="go-to-filters-btn">
          Búsqueda avanzada
        </button>
      </div>

      {/* Novedades */}
      <section className="section-novedades">
        <h2 className="novedades-title">Novedades</h2>
        <p className="novedades-text">
          En esta sección verás las últimas novedades, los productos más
          recientes ¡para que no se te escape nada!
        </p>

        <ProductSlider products={newProducts.slice(0, 10)} />
      </section>

      {/* Más buscados */}
      <section className="section-buscados">
        <h2 className="buscados-title">Más buscados</h2>
        <p className="buscados-text">
          ¿No sabes qué quieres? Echa un vistazo a los más buscados
        </p>

        <ProductSlider products={popularProducts.slice(0, 10)} />
      </section>
    </main>
  );
};

export default Home;
