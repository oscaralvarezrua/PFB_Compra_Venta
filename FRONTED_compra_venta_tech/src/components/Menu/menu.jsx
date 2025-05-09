// src/components/Menu.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";
const { VITE_API_URL } = import.meta.env;

const PADRES = [
  { nombre: "Informática", id: 1 },
  { nombre: "Electrónica", id: 2 },
  { nombre: "Telefonía", id: 3 },
  { nombre: "Gamer", id: 4 },
  { nombre: "Hogar", id: 5 },
];

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerHovered, setIsHamburgerHovered] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);

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
  const goTo = (path) => {
    navigate(path);
    closeMenu();
  };
  // Relacionar padres con sus hijos
  const getSubcategoryIds = (parentId) => categories.filter((cat) => cat.parent_id === parentId).map((cat) => cat.id);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className={`hamburger ${isHamburgerHovered ? "hamburger-hovered" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)} onMouseEnter={() => setIsHamburgerHovered(true)} onMouseLeave={() => setIsHamburgerHovered(false)}>
          &#9776;
        </div>
        <div className={`categories-title ${isHamburgerHovered ? "hamburger-hovered" : ""}`}>Todas las categorías</div>
        <div className="categories-list">
          {PADRES.map((padre) => (
            <div
              className="category"
              key={padre.id}
              onClick={() => {
                const subIds = getSubcategoryIds(padre.id);
                navigate(`/categoria?ids=${subIds.join(",")}`);
              }}
            >
              {padre.nombre}
            </div>
          ))}
        </div>
      </div>
      {isMenuOpen && (
        <div className="dropdown-menu">
          {categories.map((cat) => (
            <div key={cat.id} className="dropdown-category" onClick={() => goTo(`/categoria/${cat.id}`)}>
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
