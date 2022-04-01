import React, { Fragment, useState } from "react";

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
            <div>
              <h2>{laboratorio.titulo}</h2>
              <p>{laboratorio.profesor}</p>
              <p>{laboratorio.descripcion}</p>
              <button>Agregar Alumno</button>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ViewLaboratories;
