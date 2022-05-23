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
  const [selectedFile, setSelectedFile] = useState(null);

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

    const response = await axios(config);

    if (selectedFile) {
      const data = new FormData();
      data.append("archivo", selectedFile);

      config = {
        method: "put",
        url: `http://127.0.0.1:8080/api/uploads/publicaciones/${response.data.publicacion.id}`,
        headers: { "Content-Type": "multipart/form-data" },
        data: data,
      };

      const upload = await axios(config);
      setSelectedFile(null);
    }

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
      <div id="principal1" className="view-main">
        <div id="principal2" className="config__text-container">
          <div id="contenedortitulogrupo" className="group__info">
            <h1 id="titulGrupo" className="group__info-title">{`Grupo ${alumno.idGrupo} ${grupo.nombre}`}</h1>
            <p id="titulAlum" className="group__info-user">{`Alumno: ${alumno.nombre}`}</p>
          </div>

          <div className="view-main-container">
            <div id="contenedorPubli" className="view-main-container-post">
              <div className="group__new-pub">
                <img src={testImg} className="group__img-pub" alt="test"></img>
                <div id="contenedorNuevaPub" className="view-main-container-form">
                  <form>
                    <textarea id="nuevaPub"
                      className="view-main-container-form-area"
                      placeholder="Escribe tu publicacion aqui"
                      ref={inputTextRef}
                    ></textarea>
                    <input
                      id="subirArchivo"
                      class="group__file-upload"  
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    <button
                      id="publicarGrupo"
                      className="group__pub-button"
                      onClick={insertPublication}
                    >
                      Publicar
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div>
              {publicaciones.map((publicacion, i) => {
                const coments = comentarios.map((comentario) => {
                  if (comentario.idPublicacion === publicacion.id) {
                    return (
                      <div id="contenedorComentariosPublicados"
                        className="view-main-container-post-comment"
                        key={Math.random()}
                      >

                      <img id="imagenComentarios"
                        className="group__img-pub"
                        src={testImg}
                        alt="avatar"
                      ></img>

                      <p id="idComentarioUser">{`Comentario por Usuario con id: ${comentario.idUsuario}`}</p>

                        {comentario.archivos !== "null" && (
                          <img
                            src={comentario.archivos}
                            className="group__img-pub"
                            width="100px"
                            alt={`Publicacion ${comentario.id}`}
                          />
                        )}


                        {alumno.id === comentario.idUsuario && (
                          <button id="botonElimComent"
                            className="group__pub-button"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteComent(comentario.id);
                            }}
                          >
                            Eliminar Comentario
                          </button>
                        )}

                        <br />
                        <p id="textoComentario">{comentario.texto}</p>
                      </div>
                    );
                  }
                });

                return (
                  <div id="grupoPosts" className="view-main-container-post" key={Math.random()}>
                  <img
                  className="group__img-pub"
                  src={testImg}
                  alt="avatar"
                ></img>
                
                <div id="contenedorFechaNombre">
                      <p id="nombreUserPub">{`Post por Usuario con id: ${publicacion.idUsuario}`}</p>
                      <br />
                      <p id="fechaPub">{`${publicacion.createdAt}`}</p>    
                    </div>

                    {alumno.id === publicacion.idUsuario && (
                      <button id="elimiPub"
                        className="group__pub-button"
                        onClick={(e) => {
                          e.preventDefault();
                          deletePublication(publicacion.id, "publicaciones");
                        }}
                      >
                        Eliminar Publicacion
                      </button>
                    )}


                    
                    <p id="textoPubli" className="config__input pub-text">
                      {publicacion.texto}
                    </p>
                    <br />


                    {publicacion.archivos !== "null" && (
                      <div id="contenedorFotoPubli"
                      onClick={()=> window.open(`${publicacion.archivos}`, "_blank")}
                      >
                      <img id="fotoPubli"
                        className="view-main-container-post-img"
                        src={publicacion.archivos}
                        alt={`Publicacion ${publicacion.id}`}
                      />
                    <div id="contenedorIdArchivo">
                    <p id="tipoFichero">Haga click para visualizar el fichero</p>
                    <br />
                    <p id="urlFichero">{publicacion.archivos}</p>
                    </div>
                    </div>
                    )}

                    <br />
                    <hr id="separadorComentarios" />
                    <div id="contenedorComentarios" className="view-main-container-form">
                      <form>
                        <textarea id="placeComent"
                          placeholder="Escribe tu comentario aqui"
                          ref={(el) => (comentTextRef.current[i] = el)}
                          className="view-main-container-form-area"
                          rows="3"
                          cols="70"
                        ></textarea>

                        <button id="botonComent"
                          className="group__pub-button"
                          onClick={(e) => {
                            e.preventDefault();
                            insertComent(publicacion.id, i);
                          }}
                        >
                          Enviar comentario
                        </button>
                      </form>
                    </div>
                    <br />
                    {coments}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewGroupStudents;
