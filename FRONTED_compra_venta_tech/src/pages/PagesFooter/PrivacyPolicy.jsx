import React from "react";
import "../../styles/stylesFooter/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <main className="privacy-policy-page">
      <h1>Política de Privacidad</h1>
      <p>
        En SegundaTec respetamos tu privacidad. Este sitio ha sido desarrollado
        con fines educativos por estudiantes del bootcamp de Hack A Boss y no
        almacena ni comparte tus datos reales.
      </p>
      <p>
        Cualquier información introducida en la plataforma, como email, nombre
        de usuario o contraseña, es utilizada únicamente en un entorno de
        simulación y no es compartida con terceros.
      </p>
      <p>
        Todos los datos se almacenan de forma segura en una base de datos local
        con acceso restringido a los desarrolladores del proyecto. No se
        utilizan cookies de rastreo ni se comercializa con la información.
      </p>
      <p>
        Si tienes dudas o sugerencias sobre cómo tratamos los datos en este
        entorno de aprendizaje, no dudes en contactar con nosotros.
      </p>
    </main>
  );
};

export default PrivacyPolicy;
