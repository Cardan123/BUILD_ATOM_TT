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
      {/* <Navbar /> */}
      <div className="config__container">
        <div className="config__text-container">
          <h1 className="group__info-title laboratorios">
            {laboratorio.nombre}
          </h1>

          {type === "profesor" && (
            <button className="group__pub-button" onClick={createExercise}>
              Crear ejercicio
            </button>
          )}
          <hr />
          <ul>
            {ejercicios.map((ejercicio) => {
              return (
                <div key={Math.random()} className="group__container-info-lab">
                  <li key={Math.random()}>
                    <p className="group__info-title laboratorios">
                      {ejercicio.nombre}
                    </p>
                    <p className="laboratorios">{ejercicio.descripcion}</p>
                    {type === "profesor" && (
                      <button
                        className="group__pub-button"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/group/exercise");
                          localStorage.setItem("idEjercicio", ejercicio.id);
                        }}
                      >
                        Revisar ejercicio
                      </button>
                    )}
                    {type === "alumno" &&
                      getCalificacionEjercicio(ejercicio.id)}
                    {type === "alumno" && (
                      <button
                        className="group__pub-button"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/laboratories/do");
                          localStorage.setItem("idEjercicio", ejercicio.id);
                          localStorage.setItem(
                            "EjercicioNombre",
                            ejercicio.nombre
                          );
                        }}
                      >
                        Realizar ejercicio
                      </button>
                    )}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default EvaluateGroup;
