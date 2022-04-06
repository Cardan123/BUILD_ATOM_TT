import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";

const EvaluateGroup = (props) => {
  const [ejercicios, setEjercicios] = useState([{}]);
  const [alumnos, setAlumnos] = useState([{}]);
  const [laboratorio, setLaboratorio] = useState([{}]);

  const getAlumnos = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/alumnos",
      headers: {},
    };

    const response = await axios(config);

    const alumnos = response.data.alumnos;

    const pubFiltered = alumnos.filter((alumno) => {
      return localStorage.getItem("idGrupo") === alumno.idGrupo.toString();
    });

    setAlumnos(pubFiltered);
  };

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

  useEffect(() => {
    getAlumnos();
    getLaboratorios();
    getEjercicios();
  }, [setAlumnos, setLaboratorio, setEjercicios]);

  return (
    <Fragment>
      <Navbar />
      <div>
        <h1>{laboratorio.nombre}</h1>
        <hr />
        <ul>
          {ejercicios.map((ejercicio) => {
            return (
              <li key={Math.random()}>
                <p>{ejercicio.nombre}</p>
                <textarea placeholder="Escribe aqui tu revision"></textarea>
                <button>Agregar Comentario</button>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default EvaluateGroup;
