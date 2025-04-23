// Importamos los Componentes
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/menu"; // Importa el componente Menu

// Importamos las páginas
import Home from "./pages/Home";
//import Login from "./pages/Login";
//import NotFound from "./pages/NotFound";
//import ProductDetail from "./pages/ProductDetail";
import PublishProduct from "./pages/PublishProduct";
//import Register from "./pages/Register";
//import RequestList from "./pages/RequestList";
//import UserDataAndChangePass from "./pages/UserDataAndChangePass";
//import UserList from "./pages/UserList";
//import UserProfile from "./pages/UserProfile";
//import UserValidation from "./pages/UserValidation";

function App() {
  return (
    <>
      <Header />
      <Menu /> {/* Añadimos el componente Menu aquí */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publicar" element={<PublishProduct />} />
      </Routes>
    </>
  );
}

export default App;
