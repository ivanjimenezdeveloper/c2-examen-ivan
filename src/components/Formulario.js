import { useState } from "react";

export const Formulario = (props) => {
  const { addAmigo, setFormularioActivo } = props;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [valoracion, setValoracion] = useState(0);

  const amigoForm = {
    nombre,
    apellido,
    valoracion,
  };

  const sumbitAmigo = (e, amigo) => {
    e.preventDefault();
    addAmigo(amigo);
  };
  return (
    <form
      noValidate
      className="col-10"
      onSubmit={(e) => sumbitAmigo(e, amigoForm)}
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
          Crear
        </button>
        <button
          type="button"
          className="btn bg-primary text-light"
          onClick={() => setFormularioActivo(false)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
