import React, { useState, useEffect } from "react";
import useUserData from "../hooks/useUserData";
import ApiImage from "../components/Post/ApiImage";
import "../styles/UserProfileView.css";
const { VITE_USER_ICON } = import.meta.env;

const UserProfileView = () => {
  const { userData, loading, error } = useUserData();
  const [activeTab, setActiveTab] = useState("perfil");

  // Estado para Perfil
  const [username, setUsername] = useState("");
  const [biography, setBiography] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Estado para Cuenta
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || "");
      setBiography(userData.biography || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
    }
  }, [userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("biography", biography);
      formData.append("phone", phone); // <-- Añade esto siempre
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Perfil guardado correctamente");
    } catch (err) {
      alert(err.message || "Error al guardar el perfil");
    }
  };

  const handleSaveAccount = async () => {
    if (password && password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const body = {
        email,
        phone,
      };
      if (password) {
        body.newPassword = password;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Datos de cuenta guardados correctamente");
    } catch (err) {
      alert(err.message || "Error al guardar los datos de cuenta");
    }
  };

  const handleDeleteAccount = () => {
    if (!window.confirm("¿Seguro que quieres eliminar tu cuenta?")) return;
    // Lógica para eliminar cuenta
    window.location.href = "/";
  };

  if (loading) return <div className="loading">Cargando perfil...</div>;
  if (error) return <div className="error">Error al cargar el perfil: {error}</div>;
  if (!userData) return <div className="error">No se encontraron datos de usuario.</div>;

  return (
    <div className="edit-profile-container">
      <h1>Mi perfil</h1>

      {/* Tabs para elegir sección */}
      <div className="tabs">
        <button className={activeTab === "perfil" ? "tab active" : "tab"} onClick={() => setActiveTab("perfil")}>
          Perfil
        </button>
        <button className={activeTab === "cuenta" ? "tab active" : "tab"} onClick={() => setActiveTab("cuenta")}>
          Mi cuenta
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "perfil" && (
          <>
            <section className="card image-card">
              <div className="card-header">Imagen de perfil</div>
              <div className="card-body image-body">
                <div className="avatar">{selectedImage ? <img src={selectedImage} alt="Avatar previsualizado" /> : <ApiImage name={userData?.avatar ? userData?.avatar : VITE_USER_ICON} alt="Avatar" />}</div>
                <div className="actions">
                  <input id="avatarInput" type="file" accept=".jpg" style={{ display: "none" }} onChange={handleImageChange} />
                  <button className="btn change-photo" onClick={() => document.getElementById("avatarInput").click()}>
                    Cambiar foto
                  </button>
                  <p className="note">Aceptamos .jpg y mínimo 400×400px</p>
                </div>
              </div>
            </section>

            <section className="card info-card">
              <div className="card-header">Información pública</div>
              <div className="card-body">
                <div className="form-group">
                  <label>Nombre de usuario</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Biografía</label>
                  <textarea value={biography} onChange={(e) => setBiography(e.target.value)} maxLength="500" />
                </div>
              </div>
            </section>

            <div className="actions-footer">
              <button className="btn save-btn" onClick={handleSaveProfile}>
                Guardar
              </button>
            </div>
          </>
        )}

        {activeTab === "cuenta" && (
          <>
            <section className="card account-card">
              <div className="card-header">Información de cuenta</div>
              <div className="card-body">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Nueva contraseña</label>
                  <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Repetir contraseña</label>
                  <input type="password" placeholder="********" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
            </section>

            <div className="actions-footer">
              <button className="btn save-btn" onClick={handleSaveAccount}>
                Guardar cambios
              </button>
              <p className="delete-account-text" onClick={handleDeleteAccount}>
                Eliminar cuenta
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileView;
