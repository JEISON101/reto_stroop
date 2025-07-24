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
      <div className="flex flex-col items-center p-4">
        <form onSubmit={enviarFoto} className="flex space-x-8 items-center my-8">
          <input
            type="file"
            name="imagen"
            accept="image/*"
            required
            className="block sm:w-1/2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-md file:bg-blue-50 file:text-blue-700"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Subir Imagen
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {imagenes.map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                localStorage.setItem("imagen", img.url);
                navigate("/home");
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
      </div>
    </>
  );
};

export default Imagenes;
