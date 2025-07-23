import { useEffect, useState } from "react";
import { COLORES } from "../data/colores";
import type { ColorInterface } from "../interfaces/ColorInterface";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const Jugar: React.FC = () => {
  const [palabra, setPalabra] = useState<ColorInterface>();
  const [color, setColor] = useState<ColorInterface>();
  const [correctas, setCorrectas] = useState<number>(0);
  const [cantPalabras, setCantPalabras] = useState<number>(0);
  const [respuesta, setRespuesta] = useState<number>()
  
  const [inicio, setInicio] = useState<number>();
  const [fin, setFin] = useState<number>();
  
  const porPalabras = Math.floor((correctas / cantPalabras) * 100);
  const navigate = useNavigate();
  
  const location = useLocation();
  const {nivel, partidaTime} = location.state;
  const [tiempoRes, setTiempoRes] = useState<number>(partidaTime? partidaTime:30);
  
  const tiemposReaccion:number[] = [];
  const promedioReaccion = tiemposReaccion.reduce((a, b)=> a + b, 0);
  
  const promedioTiempo = (inicio:number, fin:number) => {
    tiemposReaccion.push(inicio-fin)
  }

  const combinar = () => {
    const palabraRandom = COLORES[Math.floor(Math.random() * COLORES.length)];
    const colorRandom = COLORES[Math.floor(Math.random() * COLORES.length)];
    setPalabra(palabraRandom);
    setColor(colorRandom);
    setInicio(Date.now)
  };

  if (tiempoRes <= 0) {
    navigate("/resultado", {
      state: {
        cantPalabras:cantPalabras,
        correctas: correctas,
        porcentaje: porPalabras,
        reaccion:promedioReaccion/tiemposReaccion.length,
        nivel:nivel.nombre
      },
    });
  }

  if (respuesta !== undefined && respuesta <= 0){
    combinar();
    setRespuesta(nivel? nivel.tiempo/1000:3)
    setCantPalabras(cantPalabras + 1);
  }

  useEffect(() => {
    combinar();
    setRespuesta(nivel? nivel.tiempo/1000 : 3)

    const cuentaRegresiva = setInterval(() => {
      setTiempoRes((prev) => prev - 0.5);
      setRespuesta((prev) => (prev !== undefined ? prev - 0.5 : 0));
    }, 1500);

  }, [setTiempoRes, setRespuesta]);

  const validarSi = () => {
    if (palabra?.nombre == color?.nombre) {
      setCorrectas(correctas + 1);
      setFin(Date.now)
      promedioTiempo(inicio, fin)
      combinar();
    } else {
      combinar();
    }
    setCantPalabras(cantPalabras + 1);
  };

  const validarNo = () => {
    if (palabra?.nombre != color?.nombre) {
      setCorrectas(correctas + 1);
      setFin(Date.now)
      promedioTiempo(inicio, fin)
      combinar();
    } else {
      combinar();
    }
    setCantPalabras(cantPalabras + 1);
  };

  return (
    <>
      <div className="pt-24">
        <h1 className="text-center mt-4 text-2xl font-bold">
          Nivel: {nivel ? nivel.nombre : "Normal"}
        </h1>
        <div className="flex justify-around">
          <div className="text-gray-600 text-center">
            <p className="text-4xl">{porPalabras}%</p>
            <p>% de palabras</p>
          </div>
          <div className="text-gray-600 text-center">
            <h2 className="text-4xl">{cantPalabras}</h2>
            <p className="p-4">Cantidad de palabras</p>
          </div>
          <div className="text-gray-600 text-center">
            <h2 className="text-4xl">{correctas}</h2>
            <p className="p-4">Correctas</p>
          </div>
          <div className="text-gray-600 text-center">
            <h2 className="text-4xl">{tiempoRes}s</h2>
            <p className="p-4">Tiempo faltante</p>
          </div>
        </div>

        <div className="flex justify-center mt-12 mb-6">
          <p className={`text-8xl ${color?.color}`}>{palabra?.nombre}</p>
        </div>

        <div className="flex justify-center space-x-36">
          <div
            onClick={() => {validarSi(), setRespuesta(nivel? nivel.tiempo/1000:3)}}
            className="cursor-pointer hover:bg-green-300 rounded-full transition-all"
          >
            <MdCheckCircle className="text-green-600 text-6xl" />
          </div>
          <div
            onClick={() => {validarNo(), setRespuesta(nivel? nivel.tiempo/1000:3)}}
            className="cursor-pointer hover:bg-red-300 rounded-full transition-all"
          >
            <MdOutlineCancel className="text-red-600 text-6xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Jugar;