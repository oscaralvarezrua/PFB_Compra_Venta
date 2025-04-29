import React, { useState, useEffect } from "react";
import Slider from "../components/Slider/Slider";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import Footer from "../components/Footer/Footer";
import { getProducts } from "../services/ProductServices";
import "../styles/home.css";

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const products = await getProducts("created_at");
        setNewProducts(products);
      } catch (error) {
        console.error("Error cargando productos recientes", error);
      }
    };

    const fetchPopularProducts = async () => {
      try {
        const products = await getProducts("visits");
        setPopularProducts(products);
      } catch (error) {
        console.error("Error cargando productos populares", error);
      }
    };

    fetchNewProducts();
    fetchPopularProducts();
  }, []);

  return (
    <main className="main-container">
      {/* Slider de cabecera */}
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
        <button className="novedades-btn">Ver todo</button>

        <ProductSlider products={newProducts.slice(0, 10)} />
      </section>

      {/* Más buscados */}
      <section className="w-full max-w-7xl mb-10">
        <h2 className="buscados-title">Más buscados</h2>
        <p className="buscados-text">
          ¿No sabes qué quieres? Echa un vistazo a los más buscados
        </p>
        <button className="buscados-btn">Ver todo</button>

        <ProductSlider products={popularProducts.slice(0, 10)} />
      </section>

      {/* ¡Aquí renderizamos el Footer! */}
      <Footer />
    </main>
  );
};

export default Home;
