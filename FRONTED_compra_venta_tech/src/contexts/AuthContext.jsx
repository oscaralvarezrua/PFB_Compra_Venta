import { createContext, useContext, useEffect, useState } from "react";

//Creamos el contexto
const AuthContext = createContext();
export { AuthContext };

//Creamos el proveedor
export function AuthProvider({ children }) {
  //Leer el token desde localStorage
  const savedToken = localStorage.getItem("token");
  const [token, setToken] = useState(savedToken ? savedToken : "");

  //Cada vez que cambien token o user, los guardamos o eliminamos del localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  //Función para hacer login, guarda el usuario y el token
  const login = (newToken) => {
    setToken(newToken);
  };

  //Función para hacer logout, borra el usuario y el token cuando cerramos sesión
  const logout = () => {
    setToken("");
  };

  //Proveemos el contexto a la app
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
