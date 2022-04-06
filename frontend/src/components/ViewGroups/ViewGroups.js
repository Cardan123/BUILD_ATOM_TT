import axios from "axios";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import testImg from "../../assets/img/kevin.jpg";
import Navbar from "../navbar/Navbar";

const ViewGroup = (props) => {
  const inputTextRef = useRef();
  const comentTextRef = useRef([]);

  const [grupo, setGrupo] = useState([{}]);
  const [profesor, setProfesor] = useState([{}]);
  const [publicaciones, setPublicaciones] = useState([{}]);
  const [comentarios, setComentarios] = useState([{}]);

  const history = useHistory();

  const getProfesor = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/profesores/${localStorage.getItem("id")}`,
      headers: {},
    };

    let response = await axios(config);

    setProfesor(response.data.profesor);
  };

  const getGrupo = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/grupos`,
      headers: {},
    };

    const response = await axios(config);
    const grupos = response.data.grupos;

    grupos.map((grupo) => {
      if (localStorage.getItem("id") === grupo.id.toString()) {
        setGrupo(grupo);
        localStorage.setItem("idGrupo", grupo.id);
      }
    });
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

  useEffect(() => {
    getProfesor();
    getGrupo();
    getPublicaciones();
    getComentarios();
  }, [setProfesor, setPublicaciones, setGrupo, setComentarios]);

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
        <h1>{`Grupo ${grupo.id}`}</h1>
        <p>{`Profesor: ${profesor.nombre}`}</p>
        <a href="/edit/group">Editar Grupo</a>
        <a href="#">Eliminar Grupo</a>
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteComent(comentario.id);
                    }}
                  >
                    Eliminar Comentario
                  </button>
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deletePublication(publicacion.id, "publicaciones");
                }}
              >
                Eliminar Publicacion
              </button>
              <br />
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
              {coments}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ViewGroup;
