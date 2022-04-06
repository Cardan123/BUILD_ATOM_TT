import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";

const UserList = (props) => {
  const [profesor, setProfesor] = useState([{}]);

  const [alumnos, setAlumnos] = useState(["Carlos", "Kevin", "David"]);

  const getProfesor = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/profesores/${localStorage.getItem("id")}`,
      headers: {},
    };

    let response = await axios(config);

    setProfesor(response.data.profesor);
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
      <Navbar />

      <div>
        <h1>Profesor</h1>
        <ul>
          <li>{`Profesor ${profesor.nombre}`}</li>
        </ul>
      </div>

      <div>
        <h1>Alumnos</h1>
        <ul>
          {alumnos.map((alumno) => {
            return <li key={Math.random()}>{`${alumno.nombre}`}</li>;
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default UserList;
