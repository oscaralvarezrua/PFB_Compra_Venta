// src/components/Menu.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";
const { VITE_API_URL } = import.meta.env;

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerHovered, setIsHamburgerHovered] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(o => !o);
  const closeMenu = () => setIsMenuOpen(false);

  const handleHamburgerMouseEnter = () => setIsHamburgerHovered(true);
  const handleHamburgerMouseLeave = () => setIsHamburgerHovered(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await fetch(`${VITE_API_URL}/categories`);
        const json = await resp.json();
        setCategories(json.data);
      } catch (err) {
        console.error("Error al obtener las categorías:", err);
      }
    };
    fetchCategories();
  }, []);

  // Navega y cierra el menú
  const goTo = path => {
    navigate(path);
    closeMenu();
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <div
          className={`hamburger ${isHamburgerHovered ? "hamburger-hovered" : ""}`}
          onClick={toggleMenu}
          onMouseEnter={handleHamburgerMouseEnter}
          onMouseLeave={handleHamburgerMouseLeave}
        >
          &#9776;
        </div>
        <div
          className={`categories-title ${isHamburgerHovered ? "hamburger-hovered" : ""}`}
        >
          Todas las categorías
        </div>

        {/* Esta sección fija de categorías no cambia */}
        <div className="categories-list">
          <div className="category" onClick={() => goTo("/categoria/informatica")}>
            Informática
          </div>
          <div className="category" onClick={() => goTo("/categoria/electronica")}>
            Electrónica
          </div>
          <div className="category" onClick={() => goTo("/categoria/telefonia")}>
            Telefonía
          </div>
          <div className="category" onClick={() => goTo("/categoria/gamer")}>
            Gamer
          </div>
          <div className="category" onClick={() => goTo("/categoria/hogar")}>
            Hogar
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="dropdown-category"
              onClick={() => goTo(`/categoria/${cat.id}`)}
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
