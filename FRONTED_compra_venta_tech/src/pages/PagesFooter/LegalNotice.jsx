import React from "react";
import "../../styles/stylesFooter/LegalNotice.css";

const LegalNotice = () => {
  return (
  <div className="legal-notice-wrapper">
    <main className="legal-notice-page">
      <h1>Aviso Legal</h1>
      <p>
        Este sitio web, SegundaTec, ha sido creado como proyecto educativo por
        los alumnos del bootcamp Web Development de Hack A Boss: Zoe, Gabe,
        Marc, Óscar y Elba.
      </p>
      <p>
        La plataforma no persigue fines comerciales reales. Su propósito es
        demostrar las capacidades técnicas adquiridas durante el curso,
        incluyendo diseño, desarrollo backend y frontend, seguridad y
        experiencia de usuario.
      </p>
      <p>
        Las funcionalidades como registro, inicio de sesión, publicación de
        productos, solicitudes de compra o valoraciones son simulaciones
        desarrolladas con fines formativos.
      </p>
      <p>
        Cualquier contenido presente en la web es ficticio. No nos hacemos
        responsables del uso indebido del sitio fuera del entorno formativo.
      </p>
    </main>
  </div>
  );
};

export default LegalNotice;
