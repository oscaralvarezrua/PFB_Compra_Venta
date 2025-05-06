// src/pages/AboutUs.jsx
import React from "react";
import "../../styles/stylesFooter/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-wrapper">
      <main className="about-us-page">
        <h1>Sobre SegundaTec</h1>
        <p>
          SegundaTec es una plataforma de compra/venta de artículos tecnológicos
          de segunda mano, creada por un equipo de cinco estudiantes de desarrollo
          web: Zoe, Gabe, Marc, Óscar y Elba.
        </p>
        <p>
          Este proyecto nace como parte de nuestro proyecto final de Bootcamp en
          Hack A Boss, con el objetivo de ofrecer una solución sencilla, segura y
          transparente para aquellas personas que quieren vender o adquirir
          productos tecnológicos de manera eficiente.
        </p>
        <p>
          Hemos construido SegundaTec pensando tanto en la experiencia del usuario
          como en la calidad del desarrollo, aplicando las mejores prácticas de
          backend y frontend, y cuidando el diseño responsive y accesible para
          todos los dispositivos.
        </p>
        <p>
          ¡Gracias por visitar nuestra plataforma y ser parte de esta comunidad
          tecnológica!
        </p>
      </main>
    </div>
  );
};

export default AboutUs;
