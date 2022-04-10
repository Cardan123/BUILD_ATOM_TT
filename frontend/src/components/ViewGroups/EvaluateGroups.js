import { eventWrapper } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "../navbar/Navbar";

const EvaluateGroup = (props) => {
  const [ejercicios, setEjercicios] = useState([{}]);
  const [type, setType] = useState("");
  const [laboratorio, setLaboratorio] = useState([{}]);
  const [calificaciones, setCalificaciones] = useState([{}]);

  const history = useHistory();

  const getEjercicios = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/ejercicios",
      headers: {},
    };

    const response = await axios(config);

    const ejercicios = response.data.ejercicios.filter(
      (ejercicio) =>
        ejercicio.idLaboratorio.toString() ===
        localStorage.getItem("idLaboratorio")
    );

    setEjercicios(ejercicios);
    // if (type === "alumno") await getCalificaciones();
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
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/calificaciones",
      headers: {},
    };

    const response = await axios(config);

    const calificaciones = response.data.calificaciones.filter(
      (calificacion) =>
        calificacion.idAlumno.toString() === localStorage.getItem("id")
    );

    setCalificaciones(calificaciones);
  };

  useEffect(() => {
    setType(localStorage.getItem("type"));
    getLaboratorios();
    getEjercicios();

    if (localStorage.getItem("type") === "alumno") getCalificaciones();
  }, [setLaboratorio, setEjercicios, setCalificaciones]);

  const createExercise = (event) => {
    event.preventDefault();
    history.push("/new/exercise");
  };

  const getCalificacionEjercicio = (id) => {
    const print = calificaciones.map((calificacion) => {
      if (calificacion.idEjercicio === id) {
        return (
          <p key={Math.random()}>{`Calificacion ${calificacion.puntuaje}`}</p>
        );
      }
    });

    if (calificaciones) return print;
    else return <p key={Math.random()}>Ejercicio no realizado</p>;
  };

  return (
    <Fragment>
      <Navbar />
      <div>
        <h1>{laboratorio.nombre}</h1>

        {type === "profesor" && (
          <button onClick={createExercise}>Crear ejercicio</button>
        )}
        <hr />
        <ul>
          {ejercicios.map((ejercicio) => {
            return (
              <li key={Math.random()}>
                <p>{ejercicio.nombre}</p>
                <p>{ejercicio.descripcion}</p>
                {type === "profesor" && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/group/exercise");
                      localStorage.setItem("idEjercicio", ejercicio.id);
                    }}
                  >
                    Revisar ejercicio
                  </button>
                )}
                {type === "alumno" && getCalificacionEjercicio(ejercicio.id)}
                {type === "alumno" && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/group/exercise");
                      localStorage.setItem("idEjercicio", ejercicio.id);
                    }}
                  >
                    Realizar ejercicio
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default EvaluateGroup;
