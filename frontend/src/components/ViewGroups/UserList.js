import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";

const UserList = (props) => {
  const [profesor, setProfesor] = useState([{}]);

  const [alumnos, setAlumnos] = useState(["Carlos", "Kevin", "David"]);

  const getProfesor = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/profesores`,
      headers: {},
    };

    let response = await axios(config);
    const profesores = response.data.profesores;

    config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/grupos/${localStorage.getItem(
        "idGrupo"
      )}`,
      headers: {},
    };

    response = await axios(config);
    const grupo = response.data.grupo;

    const profesor = profesores.filter((profesor) => {
      if (grupo.idProfesor === profesor.id) return profesor;
    });

    setProfesor(profesor[0]);
  };

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

  useEffect(() => {
    getProfesor();
    getAlumnos();
  }, [setProfesor, setAlumnos]);

  return (
    <Fragment>
      {/* <Navbar /> */}
      <div className="list-container">
        <div className="list-container-profesor">
          <h1>Profesor</h1>
          <hr className="list-container-hr" />
          <ul>
            <li>{`Profesor ${profesor.nombre}`}</li>
          </ul>
        </div>

        <div>
          <h1>Alumnos</h1>
          <hr className="list-container-hr" />
          <ul>
            {alumnos.map((alumno) => {
              return <li key={Math.random()}>{`${alumno.nombre}`}</li>;
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;
