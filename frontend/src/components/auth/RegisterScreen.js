import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const RegisterScreen = () => {
  const nameInputRef = useRef();
  const instituteInputeRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const repeatPasswordInputRef = useRef();
  const groupInputRef = useRef();

  const [error, setError] = useState(false);
  const [type, setType] = useState("");

  const history = useHistory();

  const insertData = async (data) => {
    let config;

    if (type === "registerProfesor") {
      const enteredGroup = groupInputRef.current.value;
      config = {
        method: "post",
        url: "http://127.0.0.1:8080/api/profesores",
        headers: {},
        data: data,
      };

      const response = await axios(config);
      console.log(response.data);
      const usuario = response.data.usuario;

      const grupo = {
        nombre: enteredGroup,
        numeroAlumnos: 0,
        estado: true,
        idProfesor: usuario.id,
      };

      config = {
        method: "post",
        url: "http://127.0.0.1:8080/api/grupos",
        headers: {},
        data: grupo,
      };

      await axios(config);
    } else {
      config = {
        method: "post",
        url: "http://127.0.0.1:8080/api/alumnos",
        headers: {},
        data: data,
      };
      const response = await axios(config);
      console.log(response.data);
    }
  };

  useEffect(() => {
    setType(localStorage.getItem("type"));
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    const enteredIntitue = instituteInputeRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredRepeatPassword = repeatPasswordInputRef.current.value;
    const enteredGroup = groupInputRef.current.value;

    if (enteredPassword !== enteredRepeatPassword) {
      setError(true);
      return;
    }

    if (
      enteredPassword.length === 0 ||
      enteredRepeatPassword === 0 ||
      enteredEmail.length === 0 ||
      enteredName.length === 0 ||
      enteredIntitue.length === 0 ||
      enteredGroup.length === 0
    ) {
      setError(true);
      return;
    }

    if (type === "registerProfesor" && groupInputRef.length === 0) {
      setError(true);
      return;
    }

    if (type === "registerProfesor") {
      const profesor = {
        nombre: enteredName,
        institucion: enteredIntitue,
        email: enteredEmail,
        password: enteredPassword,
        estado: true,
      };

      insertData(profesor);

      return;
    }

    const alumno = {
      nombre: enteredName,
      institucion: enteredIntitue,
      email: enteredEmail,
      password: enteredPassword,
      estado: true,
      idGrupo: enteredGroup,
    };

    history.push("/");
    insertData(alumno);
  };

  return (
    <div className="auth__container">
      <div className="auth__image-container">
        <div className="auth__fondo"></div>
      </div>
      <div className="auth__text-container">
        <div className="auth__header">
          <h3 className="auth__subtitle">Bienvenido</h3>
        </div>
        <h2 className="auth__title">Regístrate</h2>
        <form>
          <label className="auth__label">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            className="auth__input"
            ref={nameInputRef}
          />
          <label className="auth__label">Correo</label>
          <input
            type="email"
            placeholder="example@example.com"
            name="email"
            id="email"
            className="auth__input"
            ref={emailInputRef}
          />
          <label className="auth__label">Institucion</label>
          <input
            type="institute"
            name="institute"
            id="institute"
            className="auth__input"
            ref={instituteInputeRef}
          />
          <label className="auth__label">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            className="auth__input"
            ref={passwordInputRef}
          />
          <label className="auth__label">Repetir Contraseña</label>
          <input
            type="password"
            name="password-auth"
            id="password-auth"
            className="auth__input"
            ref={repeatPasswordInputRef}
          />
          {type === "registerStudent" && (
            <Fragment>
              <label className="auth__label">Grupo</label>
              <input
                type="number"
                name="number-auth"
                id="number-auth"
                className="auth__input"
                ref={groupInputRef}
              />
            </Fragment>
          )}

          {type === "registerProfesor" && (
            <Fragment>
              <label className="auth__label">Nombre Grupo</label>
              <input
                type="text"
                name="nombreGrupo-auth"
                id="nombreGrupo-auth"
                className="auth__input"
                ref={groupInputRef}
              />
            </Fragment>
          )}
          {error && <p>Revisa los campos</p>}
          <button type="submit" className="auth__button" onClick={handleClick}>
            Regístrate
          </button>
          <p className="auth__redir">
            ¿Ya tienes una cuenta? <Link to="/auth/login"> Inicia Sesión </Link>
          </p>
        </form>
        {error && <p>Revisa los campos ingresados</p>}
      </div>
    </div>
  );
};
