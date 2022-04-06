import React, { Fragment, useState, useEffect, useRef } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";

const ViewExercise = (props) => {
  const comentTextRef = useRef([]);

  const [ejercicios, setEjercicios] = useState({});
  const [alumnos, setAlumnos] = useState([{}]);
  const [laboratorio, setLaboratorio] = useState([{}]);
  const [calificaciones, setCalificaciones] = useState([{}]);

  const getAlumnos = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/alumnos",
      headers: {},
    };

    const response = await axios(config);

    const alumnos = response.data.alumnos;

    const pubFiltered = alumnos.filter((alumno) => {
      return localStorage.getItem("idEjercicio") === alumno.id.toString();
    });

    setAlumnos(pubFiltered);
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

    setCalificaciones(calificaciones);
  };

  useEffect(() => {
    getAlumnos();
    getEjercicios();
    getLaboratorios();
    getCalificaciones();
  }, [setAlumnos, setEjercicios, setLaboratorio, setCalificaciones]);

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

  return (
    <Fragment>
      <Navbar />

      <h1>{`Ejercicio ${ejercicios.nombre}`}</h1>

      {calificaciones.map((calificacion, i) => {
        const alumno =
          alumnos.find((alumno) => alumno.id === calificacion.idAlumno) || {};

        return (
          <div key={Math.random()}>
            <h2>{alumno.nombre}</h2>
            <p>{calificacion.puntuaje}</p>
            <p>{calificacion.observacion}</p>
            <textarea
              placeholder="Escribe tu observacion o recomendacion"
              ref={(el) => (comentTextRef.current[i] = el)}
            ></textarea>
            <button
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
    </Fragment>
  );
};

export default ViewExercise;
