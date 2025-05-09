import React, { useState, useEffect } from "react";
import "./Slider.css";

const slides = [
  {
    text: (
      <>
        <span className="bold-text">Compra y vende productos</span> <br />
        <span className="normal-text">de segunda mano</span>
      </>
    ),
    image: "/slider1.jpg",
  },
  {
    text: (
      <>
        <span className="bold-text">¿Tienes cosas que ya no usas?</span> <br />
        <span className="normal-text">¡Véndelas!</span>
      </>
    ),
    image: "/slider2.jpg",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []); 

  const prevSlide = () => {
    setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : "inactive"}`}
        >
          {index === current && (
            <div className="slide-content">
              <div className="text-section">
                <h2>{slide.text}</h2>
              </div>
              <div className="image-section">
                <img src={slide.image} alt="Slide" />
              </div>
            </div>
          )}
        </div>
      ))}

      <button onClick={prevSlide} className="nav-button left">
        ◀
      </button>
      <button onClick={nextSlide} className="nav-button right">
        ▶
      </button>
    </div>
  );
};

export default Slider;
