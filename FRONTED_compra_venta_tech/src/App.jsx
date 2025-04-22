// Importamos los Componentes
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/menu";  // Importa el componente Menu


// Importamos las páginas
import Home from "./pages/Home";


function App() {
  return (
    <>
      <Header />
      <Menu />  {/* Añadimos el componente Menu aquí */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

