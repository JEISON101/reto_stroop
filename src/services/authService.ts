import axios from "axios";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

export const loguear = async ({email,password,}: {email: string;password: string;}) => {
  const user = await axios.post("http://localhost:3333/login", {email,password});
  if (user.data.valid) {
    localStorage.setItem("nombre", user.data.usuario.nombre);
    localStorage.setItem("token", user.data.token);
    return user.data.usuario;
  }
};

export const salir = () => {
  localStorage.clear();
  navigate("/");
};
