import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir al hacer clic
import "./menu.css";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data.data); // data.data porque tu backend devuelve { status, data }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        <div className="categories-title">Todas las categorías</div>

        <div className="categories-list">
          {/* Aquí siguen tus categorías destacadas como antes */}
          <div className="category" onClick={() => navigate("/categoria/informatica")}>Informática</div>
          <div className="category" onClick={() => navigate("/categoria/electronica")}>Electrónica</div>
          <div className="category" onClick={() => navigate("/categoria/telefonia")}>Telefonía</div>
          <div className="category" onClick={() => navigate("/categoria/gamer")}>Gamer</div>
          <div className="category" onClick={() => navigate("/categoria/hogar")}>Hogar</div>
        </div>
      </div>

      {/* Menú desplegable al hacer clic en la hamburguesa */}
      {isMenuOpen && (
        <div className="dropdown-menu">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="dropdown-category"
              onClick={() => navigate(`/categoria/${cat.slug || cat.name.toLowerCase()}`)}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;

