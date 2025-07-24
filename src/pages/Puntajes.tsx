import { useEffect, useState } from "react";
import builder from "xmlbuilder";
import axios from "axios";
import type { PuntajeInterface } from "../interfaces/PuntajeInterface";

const Puntajes = () => {

  const [puntajes, setPuntajes] = useState<PuntajeInterface[]>([]);

    useEffect(() => {
      const getPuntajes = async () => {
          const response = await axios.get("http://localhost:3333/puntajes");
          setPuntajes(response.data.puntajes);
      };
      getPuntajes();
    }, []);

  const info = {
    puntajes: {
      puntaje: puntajes.map((p) => ({
        cantpalabras: { _total_palabras: p.cantPalabras },
        correctas: { _correctas: p.correctas },
        porcentaje: { _porcentaje_correctas: p.porcentaje },
        reaccion: { _tiempo_reaccion: p.reaccion },
        nivel: { _nivel: p.nivel }
      })),
    },
  };
  const descargarXml = () => {
    if (puntajes?.length > 0) {
      const res = builder.create(info).end({ pretty: true });

      const blob = new Blob([res], { type: "application/xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "puntajes top 5.xml";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert("No hay registros para descargar");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      {puntajes?.length > 0 ? (
        <div>
          {puntajes.map((puntaje, idx) => (
            <div
              key={idx}
              className="rounded-xl shadow-lg bg-white p-6 border border-gray-200 hover:shadow-xl transition mb-2"
            >
              <div className="text-lg font-semibold text-gray-800 mb-2">
                Nivel: <span className="font-normal">{puntaje.nivel}</span>
              </div>
              <div className="flex flex-col gap-1 text-gray-600">
                <span>
                  <span className="font-medium">Total palabras:</span>{" "}
                  {puntaje.cantPalabras}
                </span>
                <span>
                  <span className="font-medium">Correctas:</span>{" "}
                  {puntaje.correctas}
                </span>
                <span>
                  <span className="font-medium">Porcentaje:</span>{" "}
                  {puntaje.porcentaje}%
                </span>
                <span>
                  <span className="font-medium">Reacción:</span>{" "}
                  {puntaje.reaccion}ms
                </span>
              </div>
            </div>
          ))}
          <button
            onClick={() => descargarXml()}
            className="mt-4 bg-red-500 text-md text-white rounded-lg cursor-pointer px-4 py-1"
          >
            Descargar xml
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl text-center">No hay partidas registradas</h2>
        </div>
      )}
    </div>
  );
};

export default Puntajes;
