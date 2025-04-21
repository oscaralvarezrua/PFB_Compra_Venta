FRONTED COMPRA VENTA TECH

Creo proyecto con npm create vite@latest . -- --template react
Instalo dependencias: npm install y npm install react-router-dom

En SRC:
Carpeta Assets para las imágenes y los iconos
Carpeta Components, para componentes reutilizables y dentro:
Header.jsx (componente para la cabecera)
Carpeta Context (Contextos React) y dentro:
AuthContext.jsx (para guardar usuario y token)
Carpeta Hooks (Custom Hooks) y dentro:
UseUser.jsx
Carpeta Pages (Páginas Principales) y dentro:
Home.jsx (Landing),
Register.jsx (Página de registro),
UserValidation.jsx (Página de validación de usuario),
Login.jsx (Página de Login),
UserData&ChangePass (Página datos de usuario con posibilidad de cambio de contraseña),
PublishProduct.jsx (Página de publicación de artículo),
ProductDetail.jsx (Página de detalle de artículo),
UserList.jsx (Página lista de usuarios),
UserProfile.jsx (Página detalle de usuario),
RequestList.jsx (Página Lista solicitudes compra),
NotFound.jsx (Página Not Found 404)
Carpeta Services, para las funciones que llaman al backend y dentro:
UseServices.js
Carpeta Utils para las funciones reutilizables y dentro:
helpers.js
