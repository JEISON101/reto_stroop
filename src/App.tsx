import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Jugar from "./pages/Jugar";
import Resultado from "./pages/Resultado";
import Puntajes from "./pages/Puntajes";
import Configuracion from "./pages/Configuracion";
import Imagenes from "./pages/Imagenes";
import { useEffect } from "react";
import { io } from "socket.io-client";
import Login from "./pages/login";
import VistaPrivada from "./components/VistaPrivada";

function App() {

  useEffect(() => {
    const socket = io("http://localhost:3333");
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<VistaPrivada><Home /></VistaPrivada>} />
          <Route path="/jugar" element={<VistaPrivada><Jugar /></VistaPrivada>} />
          <Route path="/configuracion" element={<VistaPrivada><Configuracion /></VistaPrivada>} />
          <Route path="/puntajes" element={<VistaPrivada><Puntajes /></VistaPrivada>} />
          <Route path="/resultado" element={<VistaPrivada><Resultado /></VistaPrivada>} />
          <Route path="/imgs" element={<VistaPrivada><Imagenes /></VistaPrivada>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
