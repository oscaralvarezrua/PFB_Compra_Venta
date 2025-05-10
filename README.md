# 🚀 Frontend de SegundaTec

SegundaTec es una plataforma de compra y venta de tecnología de segunda mano. Está desarrollado con **Vite**, **React** y **CSS puro**, y consume los endpoints de la API REST del backend.

---

# 📦 Tecnologías principales

* **Vite**: Bundler ultrarrápido para desarrollo y producción.
* **React**: Estructura de la UI basada en componentes.
* **React Router DOM**: Enrutado declarativo en el cliente.
* **React Icons**: Iconos SVG (e.g. 📣 campana, 👤 perfil).
* **Context API**: Gestión de autenticación global con `AuthContext`.
* **Fetch API**: Llamadas HTTP a la API backend.
* **CSS**: Archivos `.css` por componente para estilos encapsulados.

---

## 📁 Estructura del proyecto

```bash
FRONTED_compra_venta_tech/
├── public/                   # Recursos estáticos (index.html, favicon, icons)
├── src/                      # Código fuente React
│   ├── assets/               # Imágenes, logos y recursos estáticos
│   ├── components/           # Componentes reutilizables
│   │   ├── Filters/          # Menú de filtros avanzados (AdvancedFilters.jsx/.css)
│   │   ├── Header/           # Cabecera con búsqueda y auth (Header.jsx/.css)
│   │   ├── Modals/           # Modales (LogoutModal)
│   │   ├── Post/             # Componente ApiImage para cargar imágenes
│   │   ├── Slider/           # Carrusel de imágenes (ProductSlider.jsx/.css)
│   │   └── Footer/           # Pie de página (Footer.jsx/.css)
│   ├── contexts/             # Contexto de autenticación (`AuthContext.jsx`)
│   ├── pages/                # Vistas y páginas completas
│   │   ├── Home.jsx          # Página principal
│   │   ├── SearchFilteredProducts.jsx
│   │   ├── CategoryProducts.jsx
│   │   └── BuysList.jsx      # Listado de compras
│   ├── services/             # Lógica de llamadas a la API (`ProductServices.js`)
│   ├── styles/               # CSS global (variables, resets)
│   ├── App.jsx               # Componente raíz y rutas
│   └── main.jsx              # Punto de entrada de React
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore                # Archivos/dirs ignorados por Git
├── package.json              # Dependencias y scripts
└── vite.config.js            # Configuración de Vite
```


## 🔧 Configuración e instalación

1. **Clonar repositorio**

   git clone git@github.com:oscaralvarezrua/PFB_Compra_Venta.git
   cd FRONTED_compra_venta_tech
   
2. **Instalar dependencias**

   # Instala dependencias del proyecto
   npm install
   # Si aún no las tienes, añade:
   npm install react-router-dom react-icons prop-types

3. **Configurar variables de entorno**
   Copia `.env.example` a `.env` y modifica:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. **Iniciar servidor de desarrollo**
   npm run dev
  

## ⚙️ Scripts disponibles

| Comando           | Descripción                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Inicia el servidor de desarrollo (HMR)     |
| `npm run build`   | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la build de producción localmente    |
| `npm run lint`    | Ejecuta linter (ESLint)                    |
| `npm run format`  | Formatea el código (Prettier)              |


## 📈 Flujo de trabajo

1. Usuario hace login/registro o navega sin token.
2. Desde **Home**: carrusel de novedades y más buscados.
3. Búsqueda global con la **barra** del Header.
4. **Filtros avanzados** en lateral de Categorías o busqueda, con campos de nombre, localidad, rango de precio y orden.
5. Lista de productos en grid responsive.
6. Detalle de producto (ruta `/producto/:id`).
7. AuthContext gestiona token y sesión, modales de logout.


## 🌐 Enrutado de páginas

* `/` – Página principal (Home).
* `/search?query=<texto>` – Resultados de búsqueda con filtros.
* `/categoria?category_id=<id>&[filtros]` – Productos por categoría y filtros.
* `/producto/:id` – Detalle de un producto.
* `/login`, `/register` – Autenticación de usuario.
* `/user`, `/user/requests-list` – Perfil y notificaciones.
* `/publicar` – Formulario para publicar producto.


## 🤝 Contribuciones y buenas prácticas

* **Controlled components** para inputs y formularios.
* **Hooks** (`useFetch`, `useAuth`) para lógica compartida.
* **CSS modular** manteniendo la coherencia visual.
* **Responsive** con breakpoints 768px y 480px.
* **Accesibilidad**: labels, aria-labels, foco claro.


> Desarrollado con ❤️ por el equipo de SegundaTec usando React + Vite + CSS.  ¡Bienvenido! 🎉
