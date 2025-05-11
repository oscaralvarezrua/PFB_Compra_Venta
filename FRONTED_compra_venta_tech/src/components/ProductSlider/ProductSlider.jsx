import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ApiImage from "../Post/ApiImage";
import "./ProductSlider.css";

const { VITE_API_URL } = import.meta.env;

const ProductSlider = ({ products }) => {
  const sliderRef = useRef(null);
  const scrollAmount = () => sliderRef.current.offsetWidth * 0.25; // 4 items

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount() : scrollAmount(),
      behavior: "smooth",
    });
  };

  const handleClickProduct = async (id) => {
    try {
      await fetch(`${VITE_API_URL}/products/${id}/addvisit`, {
        method: "PUT",
      });
    } catch (e) {
      console.error("Error incrementando visitas:", e);
    }
  };

  return (
    <div className="product-slider-wrapper">
      <button
        className="slider-arrow arrow-left"
        onClick={() => scroll("left")}
      >
        ◀
      </button>

      <div className="product-slider" ref={sliderRef}>
        {products.map((p) => (
          <div key={p.id} className="product-slider-item">
            {/* RUTA ABSOLUTA */}
            <Link
              to={`/producto/${p.id}`}
              onClick={() => handleClickProduct(p.id)}
            >
              <ApiImage
                name={p.photo}
                alt={p.name}
                className="slider-img"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>
            <h3 className="product-name">{p.name}</h3>
          </div>
        ))}
      </div>

      <button
        className="slider-arrow arrow-right"
        onClick={() => scroll("right")}
      >
        ▶
      </button>
    </div>
  );
};

export default ProductSlider;
