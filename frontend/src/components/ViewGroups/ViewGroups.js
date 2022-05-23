import { faS } from "@fortawesome/free-solid-svg-icons";
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
  const [selectedFile, setSelectedFile] = useState(null);

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
      if (localStorage.getItem("id") === grupo.idProfesor.toString()) {
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

    const response = await axios(config);

    if (selectedFile) {
      const data = new FormData();
      data.append("archivo", selectedFile);

      config = {
        method: "put",
        url: `http://127.0.0.1:8080/api/uploads/comentarios/${response.data.comentario.id}`,
        headers: { "Content-Type": "multipart/form-data" },
        data: data,
      };

      const upload = await axios(config);
      setSelectedFile(null);
    }

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

  const deleteGroup = async (event) => {
    event.preventDefault();

    let config = {
      method: "delete",
      url: `http://127.0.0.1:8080/api/grupos/${localStorage.getItem(
        "idGrupo"
      )}`,
      headers: {},
    };

    await axios(config);

    config = {
      method: "delete",
      url: `http://127.0.0.1:8080/api/profesores/${localStorage.getItem("id")}`,
      headers: {},
    };

    await axios(config);

    history.push("/");
  };

  return (
    <Fragment>
      <div id="principal1" className="view-main">
        <div id="principal2" className="config__text-container">
          <div id="contenedortitulogrupo" className="group__info">
            <h1 id="titulGrupo" className="group__info-title">{`Grupo ${grupo.id} ${grupo.nombre}`}</h1>
            <p id="titulProf" className="group__info-user">{`Profesor: ${profesor.nombre}`}</p>

            <button id="editGrupo"
              className="group__pub-button"
              onClick={(e) => {
                e.preventDefault();
                history.push("/edit/group");
              }}
            >
              Editar Grupo
            </button>
            <button id="elimGrupo" className="group__pub-button" onClick={deleteGroup}>
              Eliminar Grupo
            </button>
          </div>

          <div className="view-main-container">
            <div id="contenedorPubli" className="view-main-container-post">
              <div className="group__new-pub">
                <img
                  className="group__img-pub"
                  src={testImg}
                  alt="avatar"
                ></img>
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
                            width="100px"
                            alt={`Publicacion ${comentario.id}`}
                          />
                        )}
                
                        
                        <button id="botonElimComent"
                          className="group__pub-button"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteComent(comentario.id);
                          }}
                        >
                          Eliminar Comentario
                        </button>
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


                    <button
                      id="elimiPub"
                      className="group__pub-button"
                      onClick={(e) => {
                        e.preventDefault();
                        deletePublication(publicacion.id, "publicaciones");
                      }}
                    >
                      Eliminar Publicacion
                    </button>
                    
                    
                    
                    
                    
                    
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
                          className="view-main-container-form-area"
                          ref={(el) => (comentTextRef.current[i] = el)}
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

export default ViewGroup;
