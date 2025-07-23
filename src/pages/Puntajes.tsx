import { PUNTAJES } from "../data/puntajes";
import builder from 'xmlbuilder'

const Puntajes = () => {
  const top = PUNTAJES.sort((a, b) => b.porcentaje - a.porcentaje).slice(0, 5);
  console.log(PUNTAJES.length)
  const info = {
    puntajes:{
      puntaje:top.map((p)=>({
        cantpalabras:{_text:p.cantPalabras},
        correctas:{_text:p.correctas},
        porcentaje:{_text:p.porcentaje},
        reaccion:{_text:p.porcentaje},
        nivel:{_text:p.nivel}
      }))
    }
  }
  const convertirXml = () => {
    const res = builder.create(info).end({pretty:true})
    console.log(res);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      {top.length > 0 ? (
        top.map((puntaje, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-lg bg-white p-6 border border-gray-200 hover:shadow-xl transition"
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
                {puntaje.reaccion}ns
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h2 className="text-xl text-center">No hay partidas registradas</h2>
        </div>
      )}
      <button
        onClick={() => convertirXml()}
        className="mt-4 bg-red-500 text-md text-white rounded-lg cursor-pointer px-4 py-1"
      >
        Covertir a xml
      </button>
    </div>
  );
};

export default Puntajes;
