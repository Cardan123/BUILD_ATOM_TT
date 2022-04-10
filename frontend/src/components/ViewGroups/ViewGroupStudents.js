import axios from "axios";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import testImg from "../../assets/img/kevin.jpg";
import Navbar from "../navbar/Navbar";

const ViewGroupStudents = (props) => {
  const inputTextRef = useRef();
  const comentTextRef = useRef([]);

  const [grupo, setGrupo] = useState([{}]);
  const [alumno, setAlumno] = useState([{}]);
  const [publicaciones, setPublicaciones] = useState([{}]);
  const [comentarios, setComentarios] = useState([{}]);

  const history = useHistory();

  const getAlumno = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/alumnos/${localStorage.getItem("id")}`,
      headers: {},
    };

    let response = await axios(config);

    localStorage.setItem("idGrupo", response.data.alumno.idGrupo);

    setAlumno(response.data.alumno);
  };

  const getPublicaciones = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/publicaciones",
      headers: {},
    };

    const response = await axios(config);

    const publicaciones = response.data.publicaciones;

    const pubFiltered = publicaciones.filter((publicacion) => {
      return localStorage.getItem("idGrupo") === publicacion.idGrupo.toString();
    });

    setPublicaciones(pubFiltered);
  };

  const getComentarios = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/comentarios",
      headers: {},
    };

    const response = await axios(config);

    const comentarios = response.data.comentarios;

    setComentarios(comentarios);
  };

  const getGrupo = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/grupos/${localStorage.getItem(
        "idGrupo"
      )}`,
      headers: {},
    };

    const response = await axios(config);
    const grupo = response.data.grupo;
    setGrupo(grupo);
  };

  useEffect(() => {
    getAlumno();
    getPublicaciones();
    getComentarios();
    getGrupo();
  }, [setAlumno, setPublicaciones, setComentarios, setGrupo]);

  const insertPublication = async (event) => {
    event.preventDefault();
    const enteredText = inputTextRef.current.value;

    if (enteredText.length === 0) return 0;

    const publicacion = {
      texto: enteredText,
      archivos: "null",
      idGrupo: localStorage.getItem("idGrupo"),
      idUsuario: localStorage.getItem("id"),
    };

    let config = {
      method: "post",
      url: "http://127.0.0.1:8080/api/publicaciones",
      headers: {},
      data: publicacion,
    };

    const publi = await axios(config);

    getPublicaciones();
  };

  const insertComent = async (id, i) => {
    const enteredText = comentTextRef.current[i].value;

    if (enteredText.length === 0) return 0;

    const comentario = {
      texto: enteredText,
      archivos: "null",
      idPublicacion: id,
      idUsuario: localStorage.getItem("id"),
    };

    let config = {
      method: "post",
      url: "http://127.0.0.1:8080/api/comentarios",
      headers: {},
      data: comentario,
    };

    const coments = await axios(config);

    getComentarios();
  };

  const deletePublication = async (id) => {
    let config = {
      method: "delete",
      url: `http://127.0.0.1:8080/api/publicaciones/${id}`,
      headers: {},
    };

    comentarios.map(async (comentario) => {
      if (comentario.idPublicacion === id) await deleteComent(comentario.id);
    });

    await axios(config);

    getPublicaciones();
  };

  const deleteComent = async (id) => {
    let config = {
      method: "delete",
      url: `http://127.0.0.1:8080/api/comentarios/${id}`,
      headers: {},
    };

    await axios(config);

    getComentarios();
  };

  return (
    <Fragment>
      <Navbar />

      <div>
        <h1>{`Grupo ${alumno.idGrupo} ${grupo.nombre}`}</h1>
        <p>{`Alumno: ${alumno.nombre}`}</p>
      </div>

      <div>
        <img src={testImg} width="100px"></img>
        <form>
          <textarea
            placeholder="Escribe tu publicacion aqui"
            ref={inputTextRef}
          ></textarea>
          <button onClick={insertPublication}>Enviar publicacion</button>
        </form>
      </div>

      <div>
        {publicaciones.map((publicacion, i) => {
          const coments = comentarios.map((comentario) => {
            if (comentario.idPublicacion === publicacion.id) {
              return (
                <div key={Math.random()}>
                  <p>{comentario.texto}</p>

                  {comentario.archivos !== "null" && (
                    <img
                      src={comentario.archivos}
                      width="100px"
                      alt={`Publicacion ${comentario.id}`}
                    />
                  )}
                  <p>{`by ${comentario.idUsuario}`}</p>

                  {alumno.id === comentario.idUsuario && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteComent(comentario.id);
                      }}
                    >
                      Eliminar Comentario
                    </button>
                  )}

                  <br />
                </div>
              );
            }
          });

          return (
            <div key={Math.random()}>
              <p>{publicacion.texto}</p>

              {publicacion.archivos !== "null" && (
                <img
                  src={publicacion.archivos}
                  width="100px"
                  alt={`Publicacion ${publicacion.id}`}
                />
              )}

              <p>{`by ${publicacion.idUsuario}`}</p>
              {alumno.id === publicacion.idUsuario && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deletePublication(publicacion.id, "publicaciones");
                  }}
                >
                  Eliminar Publicacion
                </button>
              )}

              <form>
                <textarea
                  placeholder="Escribe tu comentario aqui"
                  ref={(el) => (comentTextRef.current[i] = el)}
                ></textarea>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    insertComent(publicacion.id, i);
                  }}
                >
                  Enviar comentario
                </button>
              </form>
              <br />
              {coments}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ViewGroupStudents;
