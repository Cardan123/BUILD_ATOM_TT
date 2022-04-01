import React, { Fragment, useState } from "react";
import testImg from "../../assets/img/kevin.jpg";

const ViewGroup = (props) => {
  const [idGrupo, setIdGrupo] = useState(1);
  const [profesor, setProfesor] = useState("Yasmin");

  // const [publicaciones, setPublicaciones] = useState({});

  const handleClick = (event) => {
    // event.preventDefault();
    console.log("Hola ");
  };

  return (
    <Fragment>
      <nav>
        <h1>Whats that Atom?</h1>
        <a href="#">Home</a>
      </nav>

      <div>
        <h1>{`Grupo ${idGrupo}`}</h1>
        <p>{`Profesor: ${profesor}`}</p>
        <a href="#">Editar Grupo</a>
        <a href="#">Eliminar Grupo</a>
      </div>

      <div>
        <img src={testImg} width="100px"></img>
        <form>
          <textarea placeholder="Escribe tu publicacion aqui"></textarea>
          <a href="#" onClick={handleClick}>
            Enviar publicacion
          </a>
        </form>
      </div>

      <div>
        <img src={testImg} width="100px"></img>
        <p>Publicacion</p>
        <div>
          <p>Comentario</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewGroup;
