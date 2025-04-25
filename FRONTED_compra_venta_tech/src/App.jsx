// Importamos los Componentes
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/menu";

// Importamos las páginas
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import PublishProduct from "./pages/PublishProduct";
import SearchFilteredProducts from "./pages/SearchFilteredProducts";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation(); // Obtener la ubicación actual de la ruta

  return (
    <>
      {location.pathname !== "/register" && (
        <>
          <Header />
          <Menu />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/publicar" element={<PublishProduct />} />
        <Route path="/filtrados" element={<SearchFilteredProducts />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
