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
          <h1>Profesor(a)</h1>
          <hr className="list-container-hr" />
          <ul>
          <div
            style={{verticalAlign: 'middle',
            borderRadius: '50%',
            content: '',
            display: 'inline-block',
            height: '9vh',
            width: '9vh',
            backgroundImage: 'url(https://boredhumans.b-cdn.net/faces2/846.jpg)', //esta es la imagen a remplazar
            backgroundSize: '9vh',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginRight: '1vh'
          }}            
            ></div>
            <li id="prof"
            style={{  listStyleType: 'none',
              display: 'inline-block'
            }}            
            >{`Profesor ${profesor.nombre}`}</li>
          </ul>
        </div>

        <div>
          <h1>Alumnos(as)</h1>
          <hr className="list-container-hr" />
          <ul>
            
            {alumnos.map((alumno) => {
              
              return <span><div
              style={{verticalAlign: 'middle',
              borderRadius: '50%',
              content: '',
              display: 'inline-block',
              height: '9vh',
              width: '9vh',
              backgroundImage: 'url(https://boredhumans.b-cdn.net/faces2/'+`${alumno.id}`+'.jpg)', //esta es la imagen a remplazar
              backgroundSize: '9vh',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              marginRight: '1vh'
            }}            
              ></div>
              
              
              <li style={{  listStyleType: 'none',
              display: 'inline-block',
              }}    
             key={Math.random()}>{`${alumno.nombre}`}</li>
              <br></br>
              
              </span>;
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;
