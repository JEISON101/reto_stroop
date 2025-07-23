import { useState } from "react";
import type { NivelesInterface } from "../interfaces/NivelesInterface";
import { useNavigate } from "react-router-dom";

const Formulario: React.FC<NivelesInterface> = (tiempo) => {
  const navigate = useNavigate();
  const [resTime, setResTime] = useState<number>();
  const [parTime, setParTime] = useState<number>();

  const jugar = () => {
    navigate("/jugar", { state: {nivel:{nombre:'Personalizado', tiempo:resTime}, partidaTime:parTime} });
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            Configura tu partida personalizada
          </h2>
          <div className="mb-4">
            <label className="block mb-1">Tiempo de respuesta en ms</label>
            <input
              type="number"
              className="bg-gray-100 px-4 py-2 text-lg rounded w-full"
              placeholder="milisegundos"
              onChange={(e)=>setResTime(parseInt(e.target.value))}
              defaultValue={tiempo.tiempo.toString()}
              min={3}
            />
          </div>
            <div>
            <label className="block mb-1">
              Tiempo de duración de la partida
            </label>
            <input
              type="number"
              className="bg-gray-100 px-4 py-2 text-lg rounded w-full"
              placeholder="segundos"
              onChange={(e)=>setParTime(parseInt(e.target.value))}
              defaultValue={30}
              min={5}
            />
            </div>
            <button
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={jugar}
            >
            Jugar
            </button>
        </div>
      </div>
    </>
  );
};

export default Formulario;