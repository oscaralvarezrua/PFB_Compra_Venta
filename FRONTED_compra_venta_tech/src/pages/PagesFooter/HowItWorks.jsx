//Página Como funciona
import React from "react";
import "../../styles/stylesFooter/HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="how-it-works-wrapper">
    <main className="how-it-works-page">
      <h1>¿Cómo funciona SegundaTec?</h1>

      <section>
        <h2>1. Explora los productos</h2>
        <p>
          Puedes navegar por la lista de artículos tecnológicos disponibles sin
          necesidad de registrarte. Usa los filtros de búsqueda para encontrar
          productos por nombre, categoría, localidad o precio.
        </p>
      </section>

      <section>
        <h2>2. Regístrate y valida tu cuenta</h2>
        <p>
          Para poder comprar o vender, regístrate con tu correo electrónico y
          valida tu cuenta a través del e-mail que te enviaremos.
        </p>
      </section>

      <section>
        <h2>3. Publica o compra</h2>
        <p>
          Como usuario registrado puedes publicar artículos tecnológicos o
          solicitar la compra de los que te interesen. El vendedor recibirá una
          notificación y decidirá si acepta o rechaza la solicitud.
        </p>
      </section>

      <section>
        <h2>4. Valora y gestiona</h2>
        <p>
          Una vez finalizada una compra, puedes valorar al vendedor. Además,
          puedes editar tu perfil y gestionar tus productos y solicitudes desde
          tu cuenta.
        </p>
      </section>
    </main>
  </div>
  );
};

export default HowItWorks;
