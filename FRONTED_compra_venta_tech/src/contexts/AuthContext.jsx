import { createContext, useContext, useEffect, useState } from "react";

//Creamos el contexto
const AuthContext = createContext();
export { AuthContext };

//Creamos el proveedor
export function AuthProvider({ children }) {
  //Leer el token desde localStorage
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");
  const [token, setToken] = useState(savedToken ? savedToken : "");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  //Cada vez que cambien token o user, los guardamos o eliminamos del localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  //Función para hacer login, guarda el usuario y el token
  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  //Función para hacer logout, borra el usuario y el token cuando cerramos sesión
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  //Proveemos el contexto a la app
  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
