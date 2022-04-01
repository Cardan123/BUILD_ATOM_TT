import React, { Fragment, useState } from "react";

const EvaluateGroup = (props) => {
  const [ejercicios, setEjercicios] = useState([
    {
      nombre: "Metales",
      alumno: "Carlos",
    },
    {
      nombre: "Metales",
      alumno: "Yasmin",
    },
    {
      nombre: "Metales",
      alumno: "Kevin",
    },
  ]);

  const [laboratorio, setLaboratorio] = useState("Metales");

  return (
    <Fragment>
      <nav>
        <h1>What's that atom?</h1>
        <a href="#">Grupos</a>
        <a href="#">Alumnos</a>
        <a href="#">Laboratorios</a>
      </nav>

      <div>
        <h1>{laboratorio}</h1>
        <hr />
        <ul>
          {ejercicios.map((ejercicio) => {
            return (
              <li>
                <p>{ejercicio.alumno}</p>
                <textarea>Escribe el comentario</textarea>
                <a href="#">Agregar Comentario</a>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default EvaluateGroup;
