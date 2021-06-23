import { FaTimes, FaPencilAlt, FaStar } from "react-icons/fa";

export const ListadoAmigos = (props) => {
  const { amigos } = props;
  const getEstrellas = (valoracion) => {
    const arrayElementos = new Array(valoracion);
    for (let index = 0; index < valoracion; index++) {
      arrayElementos.push(<FaStar />);
    }

    return arrayElementos;
  };
  return (
    <>
      {amigos.map((amigo) => {
        return (
          <div className="col-4 contenedor bg-primary ">
            <FaPencilAlt /> <FaTimes />
            <div>
              <p>Nombre: {amigo.nombre}</p>
            </div>
            <div>
              <p>Apellido:{amigo.apellido}</p>
            </div>
            <div>
              <p>
                Valoración:{" "}
                {getEstrellas(amigo.valoracion).map((estrella) => estrella)}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
