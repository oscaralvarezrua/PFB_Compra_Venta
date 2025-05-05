import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Bienvenido, Admin 👑</h1>
      <p>Hola {user?.username}, este es tu panel de administración.</p>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button
          style={{ padding: "15px 30px", fontSize: "16px", cursor: "pointer" }}
          onClick={() => navigate("/admin/users")}
        >
          Lista de usuarios
        </button>

        <button
          style={{ padding: "15px 30px", fontSize: "16px", cursor: "pointer" }}
          onClick={() => navigate("/admin/products")}
        >
          Productos por aprobar
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
