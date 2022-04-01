import React, { Fragment, useState } from "react";

const UserList = (props) => {
  const [profesor, setprofesor] = useState("Yasmin");

  const [alumnos, setalumnos] = useState(["Carlos", "Kevin", "David"]);

  return (
    <Fragment>
      <nav>
        <h1>What's that atom?</h1>
        <a href="#">Grupos</a>
        <a href="#">Alumnos</a>
        <a href="#">Laboratorios</a>
      </nav>

      <div>
        <h1>Profesor</h1>
        <ul>
          <li>{`Profesor ${profesor}`}</li>
        </ul>
      </div>

      <div>
        <h1>Alumnos</h1>
        <ul>
          {alumnos.map((alumno) => {
            return <li>{`${alumno}`}</li>;
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default UserList;
