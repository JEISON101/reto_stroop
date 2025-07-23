import { FaTrophy } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiPlay } from "react-icons/bi";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-2">
        <div className="relative">
          <div className="flex justify-center bg-blue-900 w-full h-32 rounded-b-4xl">
            <h2 className="p-4 text-2xl text-white font-bold">Petronilo</h2>
          </div>

          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?semt=ais_hybrid&w=740"
              alt="Perfil"
              className="rounded-full w-32 h-32 object-cover -mt-18 border-4 border-white"
            />
          </div>
        </div>

        <div className="flex justify-around mt-24">
          <div 
          onClick={()=> navigate('/configuracion')}
          className="border border-gray-300 rounded-xl shadow-md w-full max-w-sm p-4 grid items-center justify-center gap-2 bg-white cursor-pointer">
            <div className="text-4xl flex justify-center">
              <FaCogs />
            </div>
            <p className="text-lg font-medium text-gray-600">Configuración</p>
          </div>
          <div 
          onClick={()=> navigate('/jugar', { state: {nivel:{nombre:'Normal', tiempo:3000}, partidaTime:30}})}
          className="border border-gray-300 rounded-xl shadow-md w-full max-w-sm p-4 grid items-center justify-center gap-2 bg-white cursor-pointer">
            <div className="text-4xl flex justify-center">
              <BiPlay />
            </div>
            <p className="text-lg font-medium text-gray-600">jugar</p>
          </div>
          <div 
          onClick={()=> navigate('/puntajes')}
          className="border border-gray-300 rounded-xl shadow-md w-full max-w-sm p-4 grid items-center justify-center gap-2 bg-white cursor-pointer">
            <div className="text-4xl flex justify-center">
              <FaTrophy />
            </div>
            <p className="text-lg font-medium text-gray-600">Puntajes</p>
          </div>
  
        </div>
      </div>
    </>
  );
};

export default Home;
