CV Tech es una aplicación web que permite a los usuarios comprar y vender productos tecnológicos. Incluye funcionalidades como registro y login de usuarios, publicación de artículos, valoraciones de vendedores y más.


🚀 Funcionalidades principales

- Registro y validación de usuarios por email

- Inicio de sesión seguro

- Creación y gestión de artículos tecnológicos

- Solicitud y aceptación de compras

- Valoración de vendedores tras la compra

- Gestión de usuarios y roles (usuario/admin)

- Sistema de categorías para los productos


🔧 Tecnologías usadas

- Frontend: HTML, CSS, JavaScript, React

- Backend: Node.js, Express

- Base de datos: MySQL

- Librerías: bcrypt, express-fileupload, nodemailer, jsonwebtoken, cors

- Entorno: Node.js + npm



💡 Instalación

Clona este repositorio:

git clone https://github.com/oscaralvarezrua/PFB_Compra_Venta


Instala las dependencias:

npm install


Configura las variables de entorno (usa .env o configura directamente en app.js)

Crea la base de datos MySQL e importa el esquema necesario

Inicia el servidor:

npm run dev



🔌 Endpoints disponibles (Postman)

Puedes importar la colección de Postman que contiene todos los endpoints implementados:


Autenticación:

Usuario:

POST /users/register Registro de usuario

POST /users/login Login de usuario

GET users/:id Info de usuario

GET /users Lista de usuarios

POST /users/password Cambio de contraseña

GET /users Lista de usuarios

POST users/rate/:transactionId Rating Vendedor

POST /users/validate/:validationCode Validar usuario

Productos:

GET /products: Lista de artículos

POST /products: Publicación de artículo

GET /products/:id: Detalle de artículo

PATCH /products/:id/sold: Marcar como vendido

Categorías:

GET /categories: Lista de categorías

Transacciones:

POST /transactions: Solicitud de compra

GET /transactions: Lista de solicitudes (según rol)

Admin:

PATCH /products/:id/approve: Aceptar publicación de artículo (admin)



🔮 Cómo probar

Usa Postman y carga la colección exportada (formato .json)

Registra un usuario, valida el correo y haz login

Publica un artículo, realiza una solicitud de compra y acepta/rechaza

Prueba el endpoint de valoración del vendedor

Usa roles diferentes para probar funcionalidades de admin



Dependencias Instaladas:

- npm init -y ,para iniciar el proyecto.
- npm i dotenv ,para manejar las variables de entorno.
- npm i -D eslint prettier ,para manejar los errores de sintaxis, mantener código limpio.
- npx eslint --init ,para analizar código JavasCript
- npm i mysql2 ,para conectar la base de datos
- npm i express ,para crear servidores
- npm jsonwebtoken ,para verificar token de autenticación, proteger rutas y sesiones.
- npm i -D morgan ,para loguear, registrar solicitudes http
- npm i bcryptjs ,para cifrar contraseñas
- npm i express-fileupload ,para subir archivos al servidor
- npm i sharp ,para manejar imágenes
- npm i nodemailer ,para enviar correos
- npm i joi ,para validar datos
- npm i -D nodemon ,para reiniciar el servidor automáticamente

Carpetas creadas:
-src y dentro:

- db (base de datos)
  Dentro he creado getPool.js y initDB.js
- controllers (Funciones controladoras. Funciones para procesar las solicitudes del cliente y devolver respuestas res.send)
  Dentro he creado errorControllers.js(vacio)
- middlewares (Ubicar los middlewares)
  Dentro he creado auth.js(vacio)
- models (Funciones que realizan peticiones a la base de datos para leer, crear, editar o eliminar información)
  Dentro he creado userModels.js(vacio)
- routes (Archivos de enrutamiento)
  Dentro he creado userRoutes.js(vacio)
- services (Funciones relacionadas entre si)
  Dentro he creado errorService.js(vacio)
- utils (Funciones o herramientas que se pueden reutilizar en todo el proyecto)
  Dentro he creado helpers.js(vacio)

Archivos creados:

- app.js ,como fichero principal.
- .env
- .env.example
- .gitignore
- readme.md
- prettierrc.json

