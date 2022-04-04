import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";

const ViewLaboratories = (props) => {
  const [laboratorios, setLaboratorios] = useState([
    {
      titulo: "Metales",
      profesor: "Yasmin",
      descripcion: "Laboratorio de Metales",
    },
    {
      titulo: "Gases",
      profesor: "Yasmin",
      descripcion: "Laboratorio de Gases",
    },
    {
      titulo: "Metaloides",
      profesor: "Yasmin",
      descripcion: "Laboratorio de Metaloides",
    },
  ]);

  const [grupo, setGrupo] = useState([{}]);
  const [profesor, setProfesor] = useState([{}]);

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
      url: `http://127.0.0.1:8080/api/grupos/${localStorage.getItem(
        "idGrupo"
      )}`,
      headers: {},
    };

    const response = await axios(config);
    const grupo = response.data.grupos;

    setGrupo(grupo);
  };

  const getLaboratorios = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/laboratorios",
      headers: {},
    };

    const response = await axios(config);

    const laboratorios = response.data.laboratorios.filter(
      (laboratorio) =>
        laboratorio.idGrupo.toString() === localStorage.getItem("idGrupo")
    );

    setLaboratorios(laboratorios);
  };

  useEffect(() => {
    getProfesor();
    getGrupo();
    getLaboratorios();
  }, [setGrupo, setProfesor, setLaboratorios]);

  const revisarLaboratorio = (id) => {
    localStorage.setItem("idLaboratorio", id);
  };

  return (
    <Fragment>
      <nav>
        <h1>What's that atom?</h1>
        <a href="#">Grupos</a>
        <a href="#">Alumnos</a>
        <a href="#">Laboratorios</a>
      </nav>

      <div>
        <h1>Laboratorios</h1>
        {laboratorios.map((laboratorio) => {
          return (
            <div key={Math.random()}>
              <h2>{laboratorio.nombre}</h2>
              <p>{laboratorio.descripcion}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  revisarLaboratorio(laboratorio.id);
                }}
              >
                Revisar Alumno
              </button>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ViewLaboratories;
