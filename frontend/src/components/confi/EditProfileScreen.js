import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const EditProfileScreen = () => {
  const nameInputRef = useRef();
  const instituteInputeRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const repeatPasswordInputRef = useRef();

  const [usuario, setUsuario] = useState({
    nombre: "",
    institucion: "",
    email: "",
  });
  const [error, setError] = useState(false);

  const history = useHistory();

  const updateAlumno = (data) => {
    let config = {
      method: "put",
      url: `http://127.0.0.1:8080/api/alumnos/${localStorage.getItem("id")}`,
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateProfesor = (data) => {
    let config = {
      method: "put",
      url: `http://127.0.0.1:8080/api/profesores/${localStorage.getItem("id")}`,
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProfesor = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/profesores/${localStorage.getItem("id")}`,
      headers: {},
    };

    const response = await axios(config);

    setUsuario(response.data.profesor);
  };

  const getAlumno = async () => {
    let config = {
      method: "get",
      url: `http://127.0.0.1:8080/api/alumnos/${localStorage.getItem("id")}`,
      headers: {},
    };

    const response = await axios(config);
    setUsuario(response.data.alumno);
  };

  useEffect(() => {
    if (localStorage.getItem("type") === "alumno") {
      getAlumno();
    } else {
      getProfesor();
    }
  }, [setUsuario]);

  const handleClick = (event) => {
    event.preventDefault();

    const enteredIntitue = instituteInputeRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredRepeatPassword = repeatPasswordInputRef.current.value;

    if (enteredPassword !== enteredRepeatPassword) {
      setError(true);
      return;
    }

    if (
      enteredPassword.length === 0 ||
      enteredRepeatPassword === 0 ||
      enteredEmail.length === 0 ||
      enteredName.length === 0 ||
      enteredIntitue.length === 0
    ) {
      setError(true);
      return;
    }

    const usuario = {
      nombre: enteredName,
      institucion: enteredIntitue,
      email: enteredEmail,
      password: enteredPassword,
      estado: true,
      idGrupo: localStorage.getItem("idGrupo"),
    };

    if (localStorage.getItem("type") === "alumno") {
      updateAlumno(usuario);
      history.push("/group/students");
    } else {
      updateProfesor(usuario);
      history.push("/group");
    }
  };

  return (
    <div className="config__container">
      <div className="config__image-container">
        <div id="imagenEditPerfil" className="config__fondo"></div>
      </div>
      <div className="config__text-container">
        <div className="config__header">
          <h3 className="config__subtitle">Configuración</h3>
        </div>
        <h2 className="config__title"></h2>
        <form>
          <label className="config__label">Nombre</label>
          <input
            defaultValue={usuario.nombre}
            type="text"
            name="name"
            id="name"
            className="config__input"
            ref={nameInputRef}
          />
          <label className="config__label">Institución</label>
          <input
            type="text"
            defaultValue={usuario.institucion}
            name="intitute"
            id="intitute"
            className="config__input"
            ref={instituteInputeRef}
          />
          <label className="config__label">Email</label>
          <input
            defaultValue={usuario.email}
            type="email"
            name="email"
            id="email"
            className="config__input"
            ref={emailInputRef}
          />
          <label className="config__label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="config__input"
            ref={passwordInputRef}
          />
          <label className="config__label">Repeat Password</label>
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            className="config__input"
            ref={repeatPasswordInputRef}
          />
          {error && <p>Revisa los campos ingresados</p>}
          <button
            type="submit"
            className="config__button"
            onClick={handleClick}
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};
