// src/pages/UserProfileView.jsx
import React, { useState, useEffect } from "react";
import useUserData from "../hooks/useUserData";
import ApiImage from "../components/Post/ApiImage";
import "../styles/UserProfileView.css";

const UserProfileView = () => {
  const { userData, loading, error } = useUserData();
  const [activeTab, setActiveTab] = useState("perfil");

  // Estado para Perfil
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Estado para Cuenta
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || "");
      setLocation(userData.location || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
    }
  }, [userData]);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    // Lógica para guardar perfil (nombre, ubicación, imagen)
    alert("Perfil guardado");
  };

  const handleSaveAccount = async () => {
    // Lógica para guardar cuenta (email, password, teléfono)
    alert("Datos de cuenta guardados");
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
        <button
          className={activeTab === "perfil" ? "tab active" : "tab"}
          onClick={() => setActiveTab("perfil")}
        >
          Perfil
        </button>
        <button
          className={activeTab === "cuenta" ? "tab active" : "tab"}
          onClick={() => setActiveTab("cuenta")}
        >
          Mi cuenta
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "perfil" && (
          <>          
            <section className="card image-card">
              <div className="card-header">Imagen de perfil</div>
              <div className="card-body image-body">
                <div className="avatar">
                  {selectedImage
                    ? <img src={selectedImage} alt="Avatar previsualizado" />
                    : <ApiImage name={userData.avatar} alt="Avatar" />
                  }
                </div>
                <div className="actions">
                  <input
                    id="avatarInput"
                    type="file"
                    accept=".jpg"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <button
                    className="btn change-photo"
                    onClick={() => document.getElementById('avatarInput').click()}
                  >
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
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Ubicación</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
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
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Nueva contraseña</label>
                  <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </section>

            <div className="actions-footer">
              <button className="btn save-btn" onClick={handleSaveAccount}>
                Guardar cambios
              </button>
              <p
                className="delete-account-text"
                onClick={handleDeleteAccount}
              >
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
