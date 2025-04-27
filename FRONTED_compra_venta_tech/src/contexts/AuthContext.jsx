import { createContext, useContext, useEffect, useState } from "react";

//Creamos el contexto
const AuthContext = createContext();
export { AuthContext };
//Creamos el proveedor
export function AuthProvider({ children }) {
  //Leer el token desde localStorage

  const savedToken = localStorage.getItem("token");
  const [token, setToken] = useState(savedToken ? savedToken : "");

  //Leer el usuario desde localStorage y guardarlo como string
  /*const savedUser = localStorage.getItem("user");
  let initialUser = null;

  //Si savedUser existe, lo convertimos en objeto
  if (savedUser) {
    initialUser = JSON.parse(savedUser);
  }
  const [user, setUser] = useState(initialUser);*/

  //Cada vez que cambien token o user, los guardamos o eliminamos del localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    /*if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }*/
  }, [token /*, user*/]);

  //Función para hacer login, guarda el usuario y el token
  const login = (/*newUser,*/ newToken) => {
    //setUser(newUser);
    setToken(newToken);
  };

  //Función para hacer logout, borra el usuario y el token cuando cerramos sesión
  const logout = () => {
    //setUser(null);
    setToken("");
  };

  //Proveemos el contexto a la app
  return (
    <AuthContext.Provider value={{ token, /*user,*/ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
