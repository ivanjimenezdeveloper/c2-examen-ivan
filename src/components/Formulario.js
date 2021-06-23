import { useCallback, useContext, useEffect, useState } from "react";
import { ContextoAmigos } from "../contexts/ContextoAmigos";

export const Formulario = (props) => {
  const { addAmigo, editaAmigo, editando, amigoEditar } = props;
  const { setFormularioActivo, setEditando } = useContext(ContextoAmigos);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [valoracion, setValoracion] = useState(0);

  const amigoForm = {
    nombre,
    apellido,
    valoracion,
  };
  const setAmigoFormSegunEditar = useCallback(
    (editando) => {
      if (editando) {
        setNombre(amigoEditar.nombre);
        setValoracion(amigoEditar.valoracion);
        setApellido(amigoEditar.apellido);
      }
    },
    [amigoEditar.apellido, amigoEditar.nombre, amigoEditar.valoracion]
  );

  useEffect(
    () => setAmigoFormSegunEditar(editando),
    [editando, setAmigoFormSegunEditar]
  );

  const cancelar = () => {
    setFormularioActivo(false);
    setEditando(false);
  };
  const sumbitAmigo = (e, amigo, editando) => {
    e.preventDefault();
    if (editando) {
      editaAmigo(amigo, amigoEditar.id);
    } else {
      addAmigo(amigo);
    }
  };
  return (
    <form
      noValidate
      className="col-10"
      onSubmit={(e) => sumbitAmigo(e, amigoForm, editando)}
    >
      <div className="row">
        <div className="form-group inputTexto">
          <label>
            Nombre:{" "}
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></input>
          </label>
        </div>
        <div className="form-group inputTexto">
          <label>
            Apellido:{" "}
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            ></input>
          </label>
        </div>
        <div className="form-group inputTexto">
          <label>
            Valoracion:{" "}
            <input
              type="number"
              value={valoracion}
              onChange={(e) => setValoracion(e.target.valueAsNumber)}
            ></input>
          </label>
        </div>
      </div>
      <div className="row">
        <button type="submit" className="btn bg-primary text-light">
          {editando ? "Edita" : "Crea"}
        </button>
        <button
          type="button"
          className="btn bg-primary text-light"
          onClick={() => cancelar()}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
