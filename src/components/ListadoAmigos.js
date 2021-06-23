import { useContext } from "react";
import { FaTimes, FaPencilAlt, FaStar } from "react-icons/fa";
import { ContextoAmigos } from "../contexts/ContextoAmigos";

export const ListadoAmigos = (props) => {
  const { setFormularioActivo, setEditando } = useContext(ContextoAmigos);

  const { amigos, deleteAmigo, setAmigoEditar } = props;

  const getEstrellas = (valoracion) => {
    const arrayElementos = new Array(valoracion);
    for (let index = 0; index < valoracion; index++) {
      arrayElementos.push(<FaStar />);
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
          <div className="col-4 contenedor bg-primary" key={amigo.id}>
            <FaPencilAlt onClick={() => setEditarAmigo(amigo)} />
            <FaTimes onClick={() => deleteAmigo(amigo.id)} />
            <div>
              <p>Nombre: {amigo.nombre}</p>
            </div>
            <div>
              <p>Apellido:{amigo.apellido}</p>
            </div>
            <div>
              <p>
                Valoración:
                {getEstrellas(amigo.valoracion).map((estrella) => estrella)}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
