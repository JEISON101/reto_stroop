import "./App.css";
import { BrowserRouter, data, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Jugar from "./pages/Jugar";
import Resultado from "./pages/Resultado";
import Puntajes from "./pages/Puntajes";
import Configuracion from "./pages/Configuracion";
import Imagenes from "./pages/Imagenes";
import { useEffect } from "react";
import Login from "./pages/login";
import VistaPrivada from "./components/VistaPrivada";
import Register from "./pages/Register";
import { UserProvider } from "./context/userContext";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    socket.on("notificacion", (data) => {
      const alertaDiv = document.createElement("div");
      alertaDiv.classList.add("toast-alert");
      alertaDiv.textContent = data.mensage || "Algo salió mal";

      document.body.appendChild(alertaDiv);

      setTimeout(() => {
        alertaDiv.classList.add("fade-out");
        alertaDiv.addEventListener("animationend", () => alertaDiv.remove());
      }, 3000);
    });

    return () => {
      socket.off("notificacion");
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              <VistaPrivada>
                <Home />
              </VistaPrivada>
            }
          />

          <Route
            path="/jugar"
            element={
              <VistaPrivada>
                <Jugar />
              </VistaPrivada>
            }
          />
          <Route
            path="/configuracion"
            element={
              <VistaPrivada>
                <Configuracion />
              </VistaPrivada>
            }
          />
          <Route
            path="/puntajes"
            element={
              <VistaPrivada>
                <Puntajes />
              </VistaPrivada>
            }
          />
          <Route
            path="/resultado"
            element={
              <VistaPrivada>
                <Resultado />
              </VistaPrivada>
            }
          />
          <Route
            path="/imgs"
            element={
              <VistaPrivada>
                <Imagenes />
              </VistaPrivada>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
