import { useEffect, useState } from "react";
import { Formulario } from "./components/Formulario";
import { ListadoAmigos } from "./components/ListadoAmigos";
import { ContextoAmigos } from "./contexts/ContextoAmigos";

function App() {
  const urlAPI = "http://localhost:3001/amigos/";
  const [amigos, setAmigos] = useState([]);
  const [formularioActivo, setFormularioActivo] = useState(false);
  const [editando, setEditando] = useState(false);
  const [amigoEditar, setAmigoEditar] = useState({
    id: -1,
    nombre: "",
    apellido: "",
    valoracion: 0,
  });
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
  const deleteAmigo = async (id) => {
    const metodo = {
      method: "DELETE",
    };

    const response = await fetch(urlAPI + id, metodo);

    if (response.ok) {
      setAmigos(amigos.filter((amigo) => (amigo.id !== id ? amigo : "")));
    }
  };

  const editaAmigo = async (amigo, id) => {
    amigo.id = id;
    const metodo = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(amigo),
    };

    const response = await fetch(urlAPI + amigo.id, metodo);

    if (response.ok) {
      const amigo = await response.json();
      setAmigos(
        amigos.map((amigoMap) => (amigoMap.id === amigo.id ? amigo : amigoMap))
      );
    }
    setFormularioActivo(false);
  };

  useEffect(() => getAmigos(), []);

  return (
    <ContextoAmigos.Provider
      value={{
        setFormularioActivo,
        setEditando,
      }}
    >
      <div className="container">
        <div className="row">
          <h1>Gestión de mis {amigos.length} Amigos</h1>
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
              editaAmigo={editaAmigo}
              editando={editando}
              amigoEditar={amigoEditar}
            />
          )}
        </div>
        <main className="row mainContainer text-light">
          <ListadoAmigos
            amigos={amigos}
            deleteAmigo={deleteAmigo}
            setAmigoEditar={setAmigoEditar}
          />
        </main>
      </div>
    </ContextoAmigos.Provider>
  );
}

export default App;
