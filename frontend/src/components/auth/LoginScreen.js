import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const LoginScreen = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [profesores, setProfesores] = useState([]);

  const mailInputRef = useRef();
  const passwordInputRef = useRef();

  const history = useHistory();

  const getAlumnos = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/alumnos",
      headers: {},
    };

    const response = await axios(config);

    const alumnos = response.data.alumnos.filter(
      (alumno) => alumno.estado != false
    );

    setAlumnos(alumnos);
  };

  const getProfesor = async () => {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8080/api/profesores",
      headers: {},
    };

    const response = await axios(config);

    const profesores = response.data.profesores.filter(
      (profesor) => profesor.estado !== false
    );

    setProfesores(profesores);
  };

  useEffect(() => {
    getAlumnos();
    getProfesor();
  }, []);

  const buttonHandle = (event) => {
    event.preventDefault();

    const enteredMail = mailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let encontrado = false;

    alumnos.map((alumno) => {
      if (alumno.email === enteredMail && alumno.password === enteredPassword) {
        console.log("encontrado");

        localStorage.setItem("id", alumno.id);
        localStorage.setItem("type", "alumno");
        history.push("/group/students");
        encontrado = true;
      }
    });

    if (encontrado) return;

    profesores.map((profesor) => {
      if (
        profesor.email === enteredMail &&
        profesor.password === enteredPassword
      ) {
        console.log("encontrado");
        localStorage.setItem("id", profesor.id);
        localStorage.setItem("type", "profesor");
        history.push("/group");
        // console.log(profesor);
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
