import React, { useEffect, useState } from "react";
import ApiImage from "../components/Post/ApiImage";

const { VITE_API_URL, VITE_USER_ICON } = import.meta.env;

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.data))
      .catch(() => alert("Error al cargar usuarios"));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${VITE_API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
      } else {
        alert("Error al eliminar usuario");
      }
    } catch {
      alert("Error al eliminar usuario");
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <ApiImage
              name={user?.avatar ? user?.avatar : VITE_USER_ICON}
              alt={user.username}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            {user.username} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
