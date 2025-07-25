import { FaTrophy } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiExit, BiPlay } from "react-icons/bi";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  const navigate = useNavigate();
  function printMessage(e: React.MouseEvent<HTMLImageElement>) {
    e.preventDefault();
      toast.custom((t) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <img
            className="h-10 w-10 rounded-full"
            src={localStorage.getItem('imagen')}
            alt=""
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {localStorage.getItem('mombre')}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            !Ha ingresado al top 5 de puntajes locales¡
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Cerrar
      </button>
    </div>
  </div>
))
  }

  const salir = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <>
      <div className="px-2">
        <div className="relative">
          <div className="flex justify-center bg-blue-900 w-full h-32 rounded-b-4xl">
            <h2 className="p-4 text-2xl text-white font-bold">
              {localStorage.getItem("nombre")}
            </h2>
          </div>

          <div className="flex justify-center">
            <img
              onClick={(e) => {
                navigate("/imgs");
                printMessage(e);
              }}
              src={localStorage.getItem("imagen")}
              className="rounded-full w-32 h-32 object-cover -mt-18 border-4 bg-white border-white"
            />
          </div>
        </div>

        <div className="flex justify-around mt-24">
          <div
            onClick={() => navigate("/configuracion")}
            className="border border-gray-300 rounded-xl shadow-md w-full max-w-sm p-4 grid items-center justify-center gap-2 bg-white cursor-pointer"
          >
            <div className="text-4xl flex justify-center">
              <FaCogs className="hover:text-blue-500" />
            </div>
            <p className="text-lg font-medium text-gray-600">Configuración</p>
          </div>
          <div
            onClick={() =>
              navigate("/jugar", {
                state: {
                  nivel: { nombre: "Normal", tiempo: 3000 },
                  partidaTime: 30,
                },
              })
            }
            className="border border-gray-300 rounded-xl shadow-md w-full max-w-sm p-4 grid items-center justify-center gap-2 bg-white cursor-pointer"
          >
            <div className="text-4xl flex justify-center">
              <BiPlay className="text-red-500 hover:text-red-600" />
            </div>
            <p className="text-lg font-medium text-gray-600">jugar</p>
          </div>
          <div
            onClick={() => navigate("/puntajes")}
            className="border border-gray-300 rounded-xl shadow-md w-full max-w-sm p-4 grid items-center justify-center gap-2 bg-white cursor-pointer"
          >
            <div className="text-4xl flex justify-center">
              <FaTrophy className="hover:text-amber-500" />
            </div>
            <p className="text-lg font-medium text-gray-600">Puntajes</p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => salir()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
          >
            <BiExit />
            Salir
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
