import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const RegisterScreen = () => {
  const nameInputRef = useRef();
  const instituteInputeRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const repeatPasswordInputRef = useRef();
  const groupInputRef = useRef();

  const [error, setError] = useState(false);

  const insertData = (data) => {
    let config = {
      method: "post",
      url: "http://127.0.0.1:8080/api/alumnos",
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

    const alumno = {
      nombre: enteredName,
      institucion: enteredIntitue,
      email: enteredEmail,
      password: enteredPassword,
      estado: true,
      idGrupo: enteredGroup,
    };

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
          <label className="auth__label">Institución</label>
          <input
            type="text"
            name="instituto"
            id="instituto"
            className="auth__input"
            ref={instituteInputeRef}
          />
          <label className="auth__label">Correo Electrónico</label>
          <input
            type="email"
            placeholder="example@example.com"
            name="email"
            id="email"
            className="auth__input"
            ref={emailInputRef}
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
          <label className="auth__label">Grupo</label>
          <input
            type="number"
            name="number-auth"
            id="number-auth"
            className="auth__input"
            ref={groupInputRef}
          />
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
