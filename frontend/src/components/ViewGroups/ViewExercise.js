import React, { Fragment, useState, useEffect, useRef } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ViewExercise = (props) => {
  const comentTextRef = useRef([]);

  const [ejercicios, setEjercicios] = useState({});
  const [alumnos, setAlumnos] = useState([{}]);
  const [laboratorio, setLaboratorio] = useState([{}]);
  const [calificaciones, setCalificaciones] = useState([{}]);
  const [atomos, setAtomos] = useState([{}]);

  const history = useHistory();

  const getAlumnos = async (calificacion) => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/alumnos/${calificacion.idAlumno}`,
      headers: {},
    };

    const response = await axios(config);

    const alumno = response.data.alumno;

    setAlumnos((prevState) => {
      return [...prevState, alumno];
    });
  };

  const getEjercicios = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/ejercicios/${localStorage.getItem(
        "idEjercicio"
      )}`,
      headers: {},
    };

    const response = await axios(config);

    setEjercicios(response.data.ejercicio);
  };

  const getLaboratorios = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/laboratorios/${localStorage.getItem(
        "idLaboratorio"
      )}`,
      headers: {},
    };

    const response = await axios(config);

    setLaboratorio(response.data.laboratorio);
  };

  const getCalificaciones = async () => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/calificaciones",
      headers: {},
    };

    const response = await axios(config);

    const calificaciones = response.data.calificaciones.filter(
      (calificacion) =>
        calificacion.idEjercicio.toString() ===
        localStorage.getItem("idEjercicio")
    );

    calificaciones.map((calificacion) => getAlumnos(calificacion));

    setCalificaciones(calificaciones);
  };

  const getAtomos = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/atomos",
      headers: {},
    };
    const response = await axios(config);

    const atomos = response.data.atomos.filter(
      (atomos) =>
        atomos.idEjercicio.toString() === localStorage.getItem("idEjercicio")
    );

    setAtomos(atomos);
  };

  useEffect(() => {
    getCalificaciones();
    getEjercicios();
    getLaboratorios();
    getAtomos();
  }, [setAlumnos, setEjercicios, setLaboratorio, setCalificaciones, setAtomos]);

  const sendObservation = async (id, i) => {
    const enteredText = comentTextRef.current[i].value;

    if (enteredText.length === 0) return;

    let config = {
      method: "put",
      url: `http://127.0.0.1:8080/api/calificaciones/${id}`,
      headers: {},
      data: { observacion: enteredText },
    };

    const response = await axios(config);

    getCalificaciones();
  };

  const deleteCali = async (id) => {
    let config = {
      method: "delete",
      url: `http://127.0.0.1:8080/api/calificaciones/${id}`,
      headers: {},
    };

    await axios(config);

    getCalificaciones();
  };

  const deleteAtom = async (id) => {
    let config = {
      method: "delete",
      url: `http://127.0.0.1:8080/api/atomos/${id}`,
      headers: {},
    };

    await axios(config);
  };

  const deleteExercise = async () => {
    let config = {
      method: "delete",
      url: `http://127.0.0.1:8080/api/ejercicios/${localStorage.getItem(
        "idEjercicio"
      )}`,
      headers: {},
    };

    calificaciones.map(async (calificacion) => {
      if (
        calificacion.idEjercicio.toString() ===
        localStorage.getItem("idEjercicio")
      )
        await deleteCali(calificacion.id);
    });

    atomos.map(async (atomo) => {
      if (atomo.idEjercicio.toString() === localStorage.getItem("idEjercicio"))
        await deleteAtom(atomo.id);
    });

    await axios(config);

    history.push("/group/evaluate");
  };
  const random = () => Math.floor(Math.random() * (255 - 100 + 1) + 100);

  return (
    <Fragment>
      {/* <Navbar /> */}
      <div className="config__container">
        <div className="config__text-container">
          <h1 id="tituloEjercicio33" className="group__info-title laboratorios">{`Ejercicio ${ejercicios.nombre}`}</h1>
          <button id="botonEjercicio33" className="group__pub-button" onClick={deleteExercise}>
            Eliminar Ejercicio
          </button>
          <hr id="separadorRecomendaciones"/>
          {calificaciones.map((calificacion, i) => {
            const alumno =
              alumnos.find((alumno) => alumno.id === calificacion.idAlumno) ||
              {};

            return (
              <div style={{
              background: `rgb(${random()}, ${random()}, ${random()})`, 
            }}  
            className="group__container-info-lab" key={Math.random()}>
                <h2 id="AlumnoNombreRecomendaciones" className="laboratorios">{alumno.nombre}</h2>
                <br/>
                <p id="CalificacionRecomendaciones" className="laboratorios-desc">Calificacion: {calificacion.puntuaje}</p>
                <br/>
                <p id="RecomendacionesRecomendaciones" className="laboratorios-desc">Comentario: {calificacion.observacion}</p>
                <br/>
                <textarea id="textAreaRecomendaciones"
                  className="view-main-container-form-area"
                  placeholder="Escribe tu observacion o recomendacion"
                  ref={(el) => (comentTextRef.current[i] = el)}
                ></textarea>
                <button id="botonEnviarRecomendaciones"
                  className="group__pub-button"
                  onClick={(e) => {
                    e.preventDefault();
                    sendObservation(calificacion.id, i);
                  }}
                >
                  Enviar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default ViewExercise;
