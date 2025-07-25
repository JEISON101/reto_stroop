import axios from "axios";

export const loguear = async ({email,password,}: {email: string;password: string;}) => {
  const user = await axios.post("http://localhost:3333/login", {email,password});
  if (user.data.valid) {
    localStorage.setItem("nombre", user.data.usuario.nombre);
    localStorage.setItem("token", user.data.token);
  }
};


