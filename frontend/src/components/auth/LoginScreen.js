import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const LoginScreen = () => {
  const [alumnos, setAlumnos] = useState();

  const mailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/alumnos",
      headers: {},
    };

    const alumnos = axios(config)
      .then(function (response) {
        setAlumnos(response.data.alumnos);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const buttonHandle = (event) => {
    event.preventDefault();

    const enteredMail = mailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    console.log(alumnos.map((alumno) => console.log(alumno)));

    alumnos.map((alumno) => {
      if (alumno.email === enteredMail && alumno.password === enteredPassword) {
        console.log("encontrado");
      }
    });
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
        <h2 className="auth__title">Iniciar Sesión</h2>
        <form>
          <label className="auth__label">Correo Electrónico</label>
          <input
            type="text"
            placeholder="example@example.com"
            name="email"
            id="email"
            className="auth__input"
            ref={mailInputRef}
          />
          <label className="auth__label">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            className="auth__input"
            ref={passwordInputRef}
          />
          <button type="submit" className="auth__button" onClick={buttonHandle}>
            Iniciar Sesión
          </button>
          <p className="auth__redir">
            ¿No tienes una cuenta? <Link to="/auth/register"> Regístrate </Link>
          </p>
          <p className="auth__redir">
            <Link to="/auth/resetpass"> ¿Olvidaste tu contraseña? </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
