//Importamos los Componentes
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

//Importamos las páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import PublishProduct from "./pages/PublishProduct";
import Register from "./pages/Register";
import RequestList from "./pages/RequestList";
import UserDataAndChangePass from "./pages/UserDataAndChangePass";
import UserList from "./pages/UserList";
import UserProfile from "./pages/UserProfile";
import UserValidation from "./pages/UserValidation";

function App() {
  return (
    <>
      <Header />
      <Routes>//Aquí metemos las rutas a las páginas</Routes>
    </>
  );
}

export default App;
