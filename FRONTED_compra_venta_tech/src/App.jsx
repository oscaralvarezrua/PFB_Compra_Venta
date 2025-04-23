// Importamos los Componentes
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/menu";


// Importamos las páginas
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import PublishProduct from "./pages/PublishProduct";


function App() {
  return (
    <>
      <Header />

      <Menu />  
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/search" element={<SearchResults />} /> 
        <Route path="/publicar" element={<PublishProduct />} />
      </Routes>
    </>
  );
}

export default App;
