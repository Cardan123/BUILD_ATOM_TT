import axios from "axios";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const ResetPassScreen = () => {
  const emailInputRef = useRef();

  const history = useHistory();

  const resetPassword = async (event) => {
    event.preventDefault();
    const type = localStorage.getItem("type");

    const enteredMail = emailInputRef.current.value;

    const data = {
      email: enteredMail,
    };

    let config;

    if (enteredMail.length === 0) return 0;

    if (type === "registerStudent") {
      config = {
        method: "post",
        url: "http://127.0.0.1:8080/recover/alumnos",
        headers: {},
        data: data,
      };
    } else {
      config = {
        method: "post",
        url: "http://127.0.0.1:8080/recover/profesores",
        headers: {},
        data: data,
      };
    }

    console.log(config);

    await axios(config);

    history.push("/auth");
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
        <h2 className="auth__title">¿Olvidaste tu contraseña?</h2>
        <form onSubmit={resetPassword}>
          <label className="auth__label">Introduce tu Correo Electrónico</label>
          <input
            type="text"
            placeholder="example@example.com"
            name="email"
            id="email"
            ref={emailInputRef}
            className="auth__input"
          />
          <button type="submit" className="auth__button">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
