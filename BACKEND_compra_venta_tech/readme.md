BACKEND COMPRA VENTA TECH

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
