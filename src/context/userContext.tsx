import { useContext, createContext, useState, type ReactNode } from "react";
import type { UsuarioInterface } from "../interfaces/Usuario";

const UserContext = createContext({ usuario: {} as UsuarioInterface, setUsuario: ({usuario}:UsuarioInterface) => {} });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<UsuarioInterface>({
    id: 0,
    nombre: "",
    imagen: "",
    token: "",
    email: "",
    password: "",
  });

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
