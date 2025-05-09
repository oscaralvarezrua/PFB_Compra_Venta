import React from "react";
import "../../styles/stylesFooter/CookiePolicy.css";

const CookiePolicy = () => {
  return (
  <div className="cookie-policy-wrapper">
    <main className="cookie-policy-page">
      <h1>Política de Cookies</h1>
      <p>
        En SegundaTec no utilizamos cookies reales que rastreen tu actividad.
        Esta plataforma es un entorno de aprendizaje creado por estudiantes del
        bootcamp "Web Development" de Hack A Boss.
      </p>
      <p>
        Aunque el diseño incluye avisos y rutas típicas de una aplicación real,
        no se implementa ningún sistema que recoja información personal a través
        de cookies o tecnologías similares.
      </p>
      <p>
        Gracias por usar SegundaTec y formar parte de nuestro proyecto
        educativo.
      </p>
    </main>
  </div>
  );
};

export default CookiePolicy;
