import { useEffect, useState } from "react";
import { FaTimes, FaPencilAlt, FaStar } from "react-icons/fa";
import { Formulario } from "./components/Formulario";
import { ListadoAmigos } from "./components/ListadoAmigos";

function App() {
  const urlAPI = "http://localhost:3001/amigos";
  const [amigos, setAmigos] = useState([]);
  const [formularioActivo, setFormularioActivo] = useState(false);
  const getAmigos = async () => {
    const response = await fetch(urlAPI);
    const json = await response.json();
    setAmigos(json);
  };
  const addAmigo = async (amigo) => {
    const metodo = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(amigo),
    };
    const response = await fetch(urlAPI, metodo);

    if (response.ok) {
      const amigo = await response.json();
      const amigosTemp = [...amigos];
      amigosTemp.push(amigo);
      setAmigos(amigosTemp);
    }
    setFormularioActivo(false);
  };

  useEffect(() => getAmigos(), []);
  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Gestión de mis X Amigos</h1>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn bg-primary text-light col-2"
            onClick={() => setFormularioActivo(true)}
          >
            Crear Amigo
          </button>
          {formularioActivo && (
            <Formulario
              addAmigo={addAmigo}
              setFormularioActivo={setFormularioActivo}
            />
          )}
        </div>
        <main className="row mainContainer text-light">
          <ListadoAmigos amigos={amigos} />
        </main>
      </div>
    </>
  );
}

export default App;
