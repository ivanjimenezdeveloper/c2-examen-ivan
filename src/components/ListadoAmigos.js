import { useContext } from "react";
import { FaTimes, FaPencilAlt, FaStar } from "react-icons/fa";
import { ContextoAmigos } from "../contexts/ContextoAmigos";

export const ListadoAmigos = (props) => {
  const { setFormularioActivo, setEditando } = useContext(ContextoAmigos);

  const { amigos, deleteAmigo, setAmigoEditar } = props;

  const getEstrellas = ({ valoracion, id }) => {
    const arrayElementos = new Array(valoracion);
    for (let index = 0; index < valoracion; index++) {
      arrayElementos.push(<FaStar key={`star${index}.${id}`} />);
    }

    return arrayElementos;
  };

  const setEditarAmigo = (amigo) => {
    setEditando(true);
    setAmigoEditar(amigo);
    setFormularioActivo(true);
  };

  return (
    <>
      {amigos.map((amigo) => {
        return (
          <div className="col-4 pl-0 " key={amigo.id}>
            <div className="contenedor bg-primary">
              <FaPencilAlt
                onClick={() => setEditarAmigo(amigo)}
                key={`pencil.${amigo.id}`}
              />
              <FaTimes
                onClick={() => deleteAmigo(amigo.id)}
                key={`borrar.${amigo.id}`}
              />
              <div>
                <p>{`Nombre: ${amigo.nombre}`}</p>
              </div>
              <div>
                <p>{`Apellido: ${amigo.apellido}`}</p>
              </div>
              <div>
                <p>
                  Valoración:
                  {getEstrellas(amigo).map((estrella) => estrella)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
