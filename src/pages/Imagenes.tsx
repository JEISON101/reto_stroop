import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Imagenes: React.FC = () => {
  const [imagenes, setImagenes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getImgs = async () => {
      try {
        const response = await axios.get("http://localhost:3333/imgs");
        setImagenes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getImgs();
  }, []);

  const enviarFoto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fileInput = form.elements.namedItem("imagen") as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;

    const formData = new FormData();
    formData.append("imagen", fileInput.files[0]);
    try {
      await axios.post("http://localhost:3333/img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const response = await axios.get("http://localhost:3333/imgs");
      setImagenes(response.data);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <div className="flex flex-wrap gap-4 mb-6">
          {imagenes.map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                localStorage.setItem('imagen', img.url)
                navigate("/") 
              }}
              className="border border-gray-300 rounded-lg p-2 w-32 text-center"
            >
              <img
                src={img.url}
                alt={img.name || `Imagen ${idx + 1}`}
                className="w-full h-20 object-cover rounded"
              />
              <div className="mt-2 text-xs">
                {img.name || `Imagen ${idx + 1}`}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={enviarFoto} className="flex gap-2 items-center">
          <input
            type="file"
            name="imagen"
            accept="image/*"
            required
            className="block"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Subir Imagen
          </button>
        </form>
      </div>
    </>
  );
};

export default Imagenes;
