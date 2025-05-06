import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";
const { VITE_API_URL } = import.meta.env;

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerHovered, setIsHamburgerHovered] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleHamburgerMouseEnter = () => setIsHamburgerHovered(true);
  const handleHamburgerMouseLeave = () => setIsHamburgerHovered(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(VITE_API_URL + "/categories");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className={`hamburger ${isHamburgerHovered ? "hamburger-hovered" : ""}`} onClick={toggleMenu} onMouseEnter={handleHamburgerMouseEnter} onMouseLeave={handleHamburgerMouseLeave}>
          &#9776;
        </div>
        <div className={`categories-title ${isHamburgerHovered ? "hamburger-hovered" : ""}`}>Todas las categorías</div>

        <div className="categories-list">
          <div className="category" onClick={() => navigate("/categoria/informatica")}>
            Informática
          </div>
          <div className="category" onClick={() => navigate("/categoria/electronica")}>
            Electrónica
          </div>
          <div className="category" onClick={() => navigate("/categoria/telefonia")}>
            Telefonía
          </div>
          <div className="category" onClick={() => navigate("/categoria/gamer")}>
            Gamer
          </div>
          <div className="category" onClick={() => navigate("/categoria/hogar")}>
            Hogar
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu">
          {categories.map((cat) => (
            <div key={cat.id} className="dropdown-category" onClick={() => navigate(`/categoria/${cat.id}`)}>
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
