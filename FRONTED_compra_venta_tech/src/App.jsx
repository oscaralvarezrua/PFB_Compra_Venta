import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/menu";
import Footer from "./components/Footer/Footer";

// Importa tus páginas
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import PublishProduct from "./pages/PublishProduct";
import SearchFilteredProducts from "./pages/SearchFilteredProducts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDataAndChangePass from "./pages/UserDataAndChangePass";
import ProductDetail from "./pages/ProductDetail";
import UserValidation from "./pages/UserValidation";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import UserList from "./pages/UserList";
import EditProduct from "./pages/EditProduct";
import UserMenu from "./pages/UserMenu";

function App() {
  const location = useLocation();

  return (
    <div className="app-layout">
      {location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        location.pathname !== "/changepassword" && (
          <>
            <Header />
            <Menu />
          </>
        )}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/publicar" element={<PublishProduct />} />
          <Route path="/filtrados" element={<SearchFilteredProducts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/*" element={<UserMenu />} />
          <Route path="/changepassword" element={<UserDataAndChangePass />} />
          <Route
            path="/validate/:validationCode"
            element={<UserValidation />}
          />
          <Route path="/producto/:productId" element={<ProductDetail />} />
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/usuarios/:id" element={<UserProfile />} />
          <Route path="/edit/:productId" element={<EditProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        location.pathname !== "/changepassword" && <Footer />}
    </div>
  );
}

export default App;
