// Página lista ususarios
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiImage from "../components/Post/ApiImage";
import "../styles/UserList.css";

const { VITE_API_URL } = import.meta.env;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/users`);
        const data = await res.json();
        setUsers(data.data);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="user-list-msg">Cargando usuarios...</p>;

  return (
    <div className="user-list-page">
      <h2>Usuarios registrados</h2>
      {users.length === 0 ? (
        <p className="user-list-msg">No hay usuarios registrados.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/usuarios/${user.id}`}>
                <ApiImage name={user.avatar} alt={user.username} />
                <div>
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
