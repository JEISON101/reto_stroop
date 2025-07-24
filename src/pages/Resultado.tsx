import { useLocation, useNavigate } from "react-router-dom";
import type { PuntajeInterface } from "../interfaces/PuntajeInterface";
import axios from "axios";

const Resultado = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { correctas, porcentaje, reaccion, cantPalabras, nivel } = location.state;

  const puntajeFinal:PuntajeInterface = {
    cantPalabras:cantPalabras,
    correctas:correctas,
    porcentaje:porcentaje,
    reaccion:reaccion,
    nivel:nivel
  }

  const subirPuntaje = async(puntaje:PuntajeInterface) => {
    await axios.post("http://localhost:3333/puntaje", puntaje)
    navigate("/home");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6">Resultados de la Partida</h2>
        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-blue-600">Total palabras:</span> {cantPalabras}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-blue-600">Correctas:</span> {correctas}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-blue-600">Porcentaje:</span> {porcentaje}%
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-blue-600">Tiempo de reacción:</span> {reaccion}ms
          </p>
        </div>
        <div className="mt-6 flex flex-col items-center space-y-2">
          <span className="text-gray-500 text-sm">¡Comparte tus resultados!</span>

            <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => {
              const text = `¡Obtuve ${correctas} correctas, ${porcentaje}% de aciertos y un tiempo de respuesta de ${reaccion}ms en Stroop!`;
              window.open(
              `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(text)}`,
              "_blank"
              );
            }}
            >
            Compartir en Facebook
            </button>
            <button
            className="bg-black hover:bg-black/90 text-white font-semibold py-2 px-4 rounded"
            onClick={() => {
              const text = `¡Obtuve ${correctas} correctas, ${porcentaje}% de aciertos y un tiempo de respuesta de ${reaccion}ms en Stroop!`;
              window.open(
              `https://twitter.com/intent/tweet?text=$${encodeURIComponent(text)}`,
              "_blank"
              );
            }}
            >
            Compartir en X
            </button>
            <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => subirPuntaje(puntajeFinal)}
            >
            Ir al Home
            </button>
        </div>
      </div>
    </div>
  );
}

export default Resultado