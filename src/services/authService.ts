import axios from "axios";
import { useUser } from "../context/userContext";

type Parametros = {
  nombre?:string;
  email:string;
  password:string;
}

const { setUsuario } = useUser();

export const loguear = async ({email,password,}:Parametros) => {
  const user = await axios.post("http://localhost:3333/login", {email,password});
  if (user.data.valid) {
    setUsuario(user.data.usuario);
  }
};

export const registrar = async ({nombre, email, password}:Parametros) => {
  const newUser = await axios.post("http://localhost:3333/register", {nombre, email, password});
  if (newUser.data.valid) {
    setUsuario(newUser.data.usuario);
  }
}

