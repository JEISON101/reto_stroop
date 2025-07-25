import axios from "axios";
type Parametros = {
  nombre?:string;
  email:string;
  password:string;
}

export const loguear = async ({email,password,}:Parametros) => {
  const user = await axios.post("http://localhost:3333/login", {email,password});
  if (user.data.valid) {
    localStorage.setItem("nombre", user.data.usuario.nombre);
    localStorage.setItem("token", user.data.token);
  }
};

export const registrar = async ({nombre, email, password}:Parametros) => {
  const newUser = await axios.post("http://localhost:3333/register", {nombre, email, password});
  if (newUser.data.valid) {
    localStorage.setItem("nombre", newUser.data.usuario.nombre);
    localStorage.setItem("token", newUser.data.token);
  }
}

