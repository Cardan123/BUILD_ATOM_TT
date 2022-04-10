import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const ViewLaboratories = (props) => {
  const [type, setType] = useState("");
  const [laboratorios, setLaboratorios] = useState([]);
  const [ejercicios, setEjercicios] = useState([{}]);
  const [atomos, setAtomos] = useState([{}]);
  const [calificaciones, setCalificaciones] = useState([{}]);

  const history = useHistory();

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

  const getEjercicos = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/ejercicios",
      headers: {},
    };

    const response = await axios(config);

    setEjercicios(response.data.ejercicios);
  };

  const getAtomos = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/atomos",
      headers: {},
    };

    const response = await axios(config);

    setAtomos(response.data.atomos);
  };

  const getCalificaciones = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/calificaciones",
      headers: {},
    };

    const response = await axios(config);

    setCalificaciones(response.data.calificaciones);
  };

  useEffect(() => {
    setType(localStorage.getItem("type"));
    getLaboratorios();
    getEjercicos();
    getCalificaciones();
    getAtomos();
  }, [setLaboratorios, setEjercicios, setCalificaciones, setAtomos]);

  const revisarLaboratorio = (id) => {
    localStorage.setItem("idLaboratorio", id);
    history.push("/group/evaluate");
  };

  const realizarLaboratorio = (id) => {
    localStorage.setItem("idLaboratorio", id);
    history.push("/group/evaluate");
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

  const deleteExercise = async (id) => {
    let config = {
      method: "delete",
      url: `http://127.0.0.1:8080/api/ejercicios/${id}`,
      headers: {},
    };

    calificaciones.map(async (calificacion) => {
      if (calificacion.idEjercicio === id) await deleteCali(calificacion.id);
    });

    atomos.map(async (atomo) => {
      if (atomo.idEjercicio === id) await deleteAtom(atomo.id);
    });

    await axios(config);
  };

  const deleteLaboratory = async (id) => {
    console.log("HOla");

    let config = {
      method: "delete",
      url: `http://127.0.0.1:8080/api/laboratorios/${id}`,
      headers: {},
    };

    await ejercicios.map(async (ejercicio) => {
      if (ejercicio.idLaboratorio === id) await deleteExercise(ejercicio.id);
    });

    await axios(config);

    getLaboratorios();
  };

  const createLaboratory = (event) => {
    event.preventDefault();
    history.push("/new/lab");
  };

  return (
    <Fragment>
      <Navbar />

      <div>
        <h1>Laboratorios</h1>
        <button onClick={createLaboratory}>Crear Laboratorio</button>
        {laboratorios.map((laboratorio) => {
          return (
            <div key={Math.random()}>
              <h2>{laboratorio.nombre}</h2>
              <p>{laboratorio.descripcion}</p>

              {type === "profesor" && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      revisarLaboratorio(laboratorio.id);
                    }}
                  >
                    Revisar Laboratorio
                  </button>
                ) && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteLaboratory(laboratorio.id);
                    }}
                  >
                    Eliminar Laboratorio
                  </button>
                )}

              {type === "alumno" && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    realizarLaboratorio(laboratorio.id);
                  }}
                >
                  Realizar Laboratorio
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ViewLaboratories;
