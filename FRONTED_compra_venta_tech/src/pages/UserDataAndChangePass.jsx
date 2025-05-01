import React, { useState } from "react";
import useUserData from "../hooks/useUserData";
import useChangePassword from "../hooks/useChangePassword";
import useUpdateUser from "../hooks/useUpdateUser";
import PasswordInput from "../components/Post/PasswordInput";
import ApiImage from "../components/Post/ApiImage";
import "../styles/UserDataAndChangePass.css";

const UserDataAndChangePass = () => {
  const { userData, loading, error: userError } = useUserData();
  const { error: passwordError, success: passwordSuccess, changePassword } = useChangePassword();
  const { error: updateError, success: updateSuccess, updateUser } = useUpdateUser();

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    biography: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Actualizar formData cuando userData cambie
  React.useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        phone: userData.phone || "",
        biography: userData.biography || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      // Crear URL para previsualización
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (avatar) {
      formDataToSend.append("avatar", avatar);
    }

    await updateUser(formDataToSend);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    await changePassword(passwordData.currentPassword, passwordData.newPassword);
  };

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (loading) {
    return <div className="loading">Cargando datos del usuario...</div>;
  }

  if (userError) {
    return <div className="error">Error al cargar los datos del usuario: {userError}</div>;
  }

  return (
    <main className="user-data-container">
      <div className="user-data-content">
        <h2>Mis Datos</h2>

        {updateError && <p className="error">{updateError}</p>}
        {updateSuccess && <p className="success">Datos actualizados correctamente</p>}

        <form onSubmit={handleSubmit} className="user-data-form">
          <div className="avatar-section">
            {userData?.avatar && !previewUrl && (
              <div className="current-avatar">
                <ApiImage name={userData.avatar} alt="Foto de perfil actual" className="profile-image" />
              </div>
            )}
            {previewUrl && (
              <div className="avatar-preview">
                <img src={previewUrl} alt="Vista previa" className="profile-image" />
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="biography">Biografía</label>
            <textarea id="biography" name="biography" value={formData.biography} onChange={handleInputChange} maxLength="500" />
          </div>

          <div className="form-group">
            <label htmlFor="avatar">Foto de perfil</label>
            <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleFileChange} />
          </div>

          <button type="submit" className="update-button">
            Actualizar datos
          </button>
        </form>

        <div className="password-section">
          <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="toggle-password-button">
            {showPasswordForm ? "Cancelar cambio de contraseña" : "Cambiar contraseña"}
          </button>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="password-form">
              {passwordError && <p className="error">{passwordError}</p>}
              {passwordSuccess && <p className="success">Contraseña actualizada correctamente</p>}

              <div className="form-group">
                <label htmlFor="currentPassword">Contraseña actual</label>
                <PasswordInput id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">Nueva contraseña</label>
                <PasswordInput id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="repeatPassword">Repetir nueva contraseña</label>
                <PasswordInput id="repeatPassword" name="repeatPassword" value={passwordData.repeatPassword} onChange={handlePasswordChange} required />
              </div>

              <button type="submit" className="change-password-button">
                Actualizar contraseña
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserDataAndChangePass;
