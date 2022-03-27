import axios from "axios";
import React, { useRef, useState } from "react";

export const EditProfileScreen = () => {
  const nameInputRef = useRef();
  const instituteInputeRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const repeatPasswordInputRef = useRef();
  const groupInputRef = useRef();

  const [error, setError] = useState(false);

  const updateAlumno = (data) => {
    const id = 2;
    let config = {
      method: "put",
      url: `http://127.0.0.1:8080/api/alumnos/${id}`,
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

    updateAlumno(alumno);
  };

  return (
    <div className="config__container">
      <div className="config__image-container">
        <div className="config__fondo"></div>
      </div>
      <div className="config__text-container">
        <div className="config__header">
          <h3 className="config__subtitle">Configuración</h3>
        </div>
        <h2 className="config__title"></h2>
        <form>
          <label className="config__label">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            className="config__input"
            ref={nameInputRef}
          />
          <label className="config__label">Institución</label>
          <input
            type="text"
            name="intitute"
            id="intitute"
            className="config__input"
            ref={instituteInputeRef}
          />
          <label className="config__label">Email</label>
          <input
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
          <label className="config__label">Grupo</label>
          <input
            type="number"
            name="grupo"
            id="grupo"
            className="config__input"
            ref={groupInputRef}
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
