import { useNavigate } from "react-router-dom";
import { NIVELES } from "../data/niveles";
import type { NivelesInterface } from "../interfaces/NivelesInterface";
import { useState } from "react";
import Formulario from "../components/Formulario";

const Configuracion = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<boolean>(false);
  const [nivelSeleccionado, setNivelSeleccionado] = useState<number>();

  const iniciar = (nivel: NivelesInterface) => {
    navigate("/jugar", { state: {nivel:nivel, partidaTime:30}});
  };

  return (
    <>
      <h2 className="text-center mt-32">
        Selecciona el nivel de complejidad del juego.
      </h2>
      <div className="flex justify-center items-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NIVELES.map((nivel) => (
            <div>
              <div
                onClick={() => iniciar(nivel)}
                key={nivel.nombre}
                className="border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105"
              >
                <h3 className="mb-2 text-xl font-bold text-gray-800 text-center">
                  {nivel.nombre}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  Tiempo: {nivel.tiempo}ms
                </p>
              </div>
              <div className="flex justify-center mt-1">

                <button
                  onClick={() => {
                    setForm(true), setNivelSeleccionado(nivel.tiempo)}}
                  className="bg-blue-400 text-md text-white py-1 px-2 rounded-md cursor-pointer">
                  Editar valores
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {form && <Formulario tiempo={nivelSeleccionado} />}
    </>
  );
};

export default Configuracion;