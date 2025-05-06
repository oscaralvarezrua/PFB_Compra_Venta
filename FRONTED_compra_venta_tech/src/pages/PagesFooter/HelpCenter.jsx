import React from "react";
import "../../styles/stylesFooter/HelpCenter.css";

const HelpCenter = () => {
  return (
    <div className="help-center-wrapper">
    <main className="help-center-page">
      <h1>Centro de Ayuda</h1>
      <p>
        ¿Tienes dudas o problemas utilizando SegundaTec? ¡Estamos aquí para
        ayudarte!
      </p>
      <p>
        A continuación, encontrarás respuestas a las preguntas más frecuentes:
      </p>
      <ul>
        <li> ¿Cómo publico un artículo?</li>
        <li> ¿Cómo solicito la compra de un producto?</li>
        <li> ¿Qué ocurre después de enviar una solicitud?</li>
        <li> ¿Cómo edito mis datos de perfil o mi contraseña?</li>
        <li> ¿Qué pasa si olvidé mi contraseña?</li>
      </ul>
      <p>
        Si tu pregunta no está en la lista o necesitas ayuda personalizada,
        puedes escribirnos a: <strong>soporte@segundatec.com</strong>
      </p>
    </main>
  </div>
  );
};

export default HelpCenter;
