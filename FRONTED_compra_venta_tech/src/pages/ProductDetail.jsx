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
      formData.append("phone", phone);
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

      alert("Perfil actualizado correctamente");
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

      alert("Datos de cuenta actualizados correctamente");
    } catch (err) {
      alert(err.message || "Error al guardar los datos de cuenta");
    }
  };

  const handleDeleteAccount = () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) return;
    // Lógica para eliminar cuenta
    window.location.href = "/";
  };

  if (loading) return <div className="loading-spinner">Cargando perfil...</div>;
  if (error) return <div className="error-message">Error al cargar el perfil: {error}</div>;
  if (!userData) return <div className="error-message">No se encontraron datos de usuario.</div>;

  return (
    <div className="profile-wrapper">
      <div className="edit-profile-container">
        <h1 className="page-title">Configuración de Perfil</h1>

        {/* Tabs mejorados */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === "perfil" ? "active" : ""}`} 
            onClick={() => setActiveTab("perfil")}
            aria-selected={activeTab === "perfil"}
          >
            Perfil
          </button>
          <button 
            className={`tab ${activeTab === "cuenta" ? "active" : ""}`} 
            onClick={() => setActiveTab("cuenta")}
            aria-selected={activeTab === "cuenta"}
          >
            Mi Cuenta
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "perfil" && (
            <>
              {/* Tarjeta de Imagen de Perfil Mejorada */}
              <div className="card profile-image-card">
                <div className="card-header">Foto de Perfil</div>
                <div className="card-body image-body">
                  <div className="avatar-container">
                    <div className="avatar">
                      {selectedImage ? (
                        <img src={selectedImage} alt="Avatar previsualizado" />
                      ) : (
                        <ApiImage 
                          name={userData?.avatar ? userData.avatar : VITE_USER_ICON} 
                          alt="Avatar del usuario" 
                        />
                      )}
                    </div>
                    <p className="note">Recomendado: 400×400 px, formato JPG</p>
                  </div>
                  <div className="image-actions">
                    <input 
                      id="avatarInput" 
                      type="file" 
                      accept="image/jpeg,image/jpg" 
                      className="file-input"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="avatarInput" className="btn change-photo">
                      Cambiar foto
                    </label>
                  </div>
                </div>
              </div>

              {/* Tarjeta de Información Pública Mejorada */}
              <div className="card public-info-card">
                <div className="card-header">Información Pública</div>
                <div className="card-body">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="username">Nombre de usuario</label>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Tu nombre de usuario"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="biography">Biografía</label>
                      <textarea
                        id="biography"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                        maxLength="500"
                        placeholder="Cuéntanos sobre ti"
                        rows="4"
                      />
                      <div className="char-counter">{biography.length}/500</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="actions-footer">
                <button className="btn save-btn" onClick={handleSaveProfile}>
                  Guardar cambios
                </button>
              </div>
            </>
          )}

          {activeTab === "cuenta" && (
            <>
              {/* Tarjeta de Información de Cuenta Mejorada */}
              <div className="card account-info-card">
                <div className="card-header">Configuración de la Cuenta</div>
                <div className="card-body">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="email">Correo electrónico</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Teléfono</label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1234567890"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Nueva contraseña</label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="repeatPassword">Confirmar contraseña</label>
                      <input
                        id="repeatPassword"
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="actions-footer">
                <button className="btn save-btn" onClick={handleSaveAccount}>
                  Actualizar cuenta
                </button>
                <button className="btn delete-account-btn" onClick={handleDeleteAccount}>
                  Eliminar cuenta permanentemente
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;