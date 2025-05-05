import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Si no hay usuario o no es admin, redirige a inicio
  if (!user || !user.is_admin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
