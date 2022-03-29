import axios from "axios";
import React, { useRef, useState } from "react";
import newgroup from "../../assets/img/newgroup.jpg";
export const NewGroupScreen = () => {
  const nameInputRef = useRef();
  const idProfesorInputRef = useRef();

  const [error, setError] = useState(false);

  const insertGroup = (data) => {
    let config = {
      method: "post",
      url: "http://127.0.0.1:8080/api/grupos",
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

    const enteredName = nameInputRef.current.value;
    const enteredIdProfesor = idProfesorInputRef.current.value;

    if (enteredName.length === 0 || enteredIdProfesor.length === 0) {
      setError(true);
      return;
    }

    const group = {
      nombre: enteredName,
      numeroAlumnos: 0,
      estado: true,
      idProfesor: 1,
    };

    insertGroup(group);
  };

  return (
    <div className="config__container">
      <div className="config__image-container">
        <div className="config__fondo">
          <img src={newgroup}></img>
        </div>
      </div>
      <div className="config__text-container">
        <div className="config__header">
          <h3 className="config__subtitle">Nuevo Grupo</h3>
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
          <label className="config__label">Id Profesor</label>
          <input
            type="number"
            name="IdProfesor"
            id="IdProfesor"
            className="config__input"
            ref={idProfesorInputRef}
          />
          {error && <p>Revisa los campos del formulario</p>}
          <button
            type="submit"
            className="config__button"
            onClick={handleClick}
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};
