import React, { useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/menu";
import Footer from "./components/Footer/Footer";
import AdminRoute from "./components/AdminRoute";
import { AuthContext } from "./contexts/AuthContext";

// Páginas generales
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import PublishProduct from "./pages/PublishProduct";
import SearchFilteredProducts from "./pages/SearchFilteredProducts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserMenu from "./pages/UserMenu";
import ChangePassword from "./pages/ChangePassword";
import UserValidation from "./pages/UserValidation";
import ProductDetail from "./pages/ProductDetail";
import UserList from "./pages/UserList";
import UserProfile from "./pages/UserProfile";
import EditProduct from "./pages/EditProduct";
import ForgotPassword from "./pages/ForgotPassword";
import RecoverPassword from "./pages/RecoverPassword";
import NotFound from "./pages/NotFound";
import CategoryProducts from "./pages/CategoryProducts";

// Páginas admin
import AdminDashboard from "./pages/AdminDashboard";
import ProductApproval from "./pages/ProductApproval";

// Páginas del Footer
import AboutUs from "./pages/PagesFooter/AboutUs";
import HowItWorks from "./pages/PagesFooter/HowItWorks";
import HelpCenter from "./pages/PagesFooter/HelpCenter";
import LegalNotice from "./pages/PagesFooter/LegalNotice";
import PrivacyPolicy from "./pages/PagesFooter/PrivacyPolicy";
import CookiePolicy from "./pages/PagesFooter/CookiePolicy";

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Rutas donde ocultar header/menu
  const hideLayoutPaths = [
    "/register",
    "/login",
    "/changepassword",
    "/forgot-password",
  ];
  const showLayout = !hideLayoutPaths.includes(location.pathname);
  // Ocultar el Menu cuando estamos en /user/*
  const hideMenu = location.pathname.startsWith("/user");
  const showMenu = !hideMenu;

  return (
    <div className="app-layout">
      {showLayout && (
        <>
          <Header />
          {showMenu && <Menu />}
        </>
      )}

      <div className="main-content">
        <Routes>
          {/* Login y Registro */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Home (admin redirige a dashboard) */}
          <Route
            path="/"
            element={
              user?.role === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Home />
              )
            }
          />

          {/* Otras rutas públicas */}
          <Route path="/search" element={<SearchResults />} />
          <Route path="/filtrados" element={<SearchFilteredProducts />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/validate/:validationCode" element={<UserValidation />} />

          {/* === ESTA RUTA DEBE VENIR ANTES DE /user/* === */}
          <Route path="/producto/:productId" element={<ProductDetail />} />

          <Route path="/usuarios/:id" element={<UserProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recover/:recoveryCode" element={<RecoverPassword />} />
          <Route path="/categoria/:id" element={<CategoryProducts />} />
          <Route path="/categoria" element={<CategoryProducts />} />

          {/* Rutas de usuario (protected) */}
          <Route
            path="/publicar"
            element={user ? <PublishProduct /> : <Navigate to="/register" />}
          />
          <Route
            path="/user/*"
            element={user ? <UserMenu /> : <Navigate to="/register" />}
          />
          <Route
            path="/edit/:productId"
            element={user ? <EditProduct /> : <Navigate to="/register" />}
          />

          {/* Footer pages */}
          <Route path="/quienes-somos" element={<AboutUs />} />
          <Route path="/como-funciona" element={<HowItWorks />} />
          <Route path="/centro-de-ayuda" element={<HelpCenter />} />
          <Route path="/aviso-legal" element={<LegalNotice />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
          <Route path="/politica-de-cookies" element={<CookiePolicy />} />

          {/* Admin routes */}
          <Route
            path="/usuarios"
            element={user?.role === "admin" ? <UserList /> : <Navigate to="/login" />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductApproval />
              </AdminRoute>
            }
          />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {showLayout && <Footer />}
    </div>
  );
}

export default App;
