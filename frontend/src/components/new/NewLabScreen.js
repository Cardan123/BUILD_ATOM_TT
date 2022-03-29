import axios from "axios";
import React, { useState, useRef } from "react";
import newlab from "../../assets/img/newlab.png";
export const NewLabScreen = () => {
  const nameInputRef = useRef();
  const idGroupInputRef = useRef();
  const descriptionInputRef = useRef();

  const [error, setError] = useState(false);

  const insertLab = (data) => {
    let config = {
      method: "post",
      url: "http://127.0.0.1:8080/api/laboratorios",
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
    const enteredGroup = idGroupInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (
      enteredName.length === 0 ||
      enteredGroup === 0 ||
      descriptionInputRef === 0
    ) {
      setError(true);
      return;
    }

    const laboratorio = {
      nombre: enteredName,
      descripcion: enteredDescription,
      idGrupo: enteredGroup,
    };

    insertLab(laboratorio);
  };

  return (
    <div className="config__container">
      <div className="config__image-container">
        <div className="config__fondo">
          <img src={newlab}></img>
        </div>
      </div>
      <div className="config__text-container">
        <div className="config__header">
          <h3 className="config__subtitle">Nuevo Laboratorio</h3>
        </div>
        {/* <h2 className="config__title"></h2> */}
        <form>
          <label className="config__label">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            className="config__input"
            ref={nameInputRef}
          />
          <label className="config__label">Id Grupo</label>
          <input
            type="number"
            name="grupo"
            id="grupo"
            className="config__input"
            ref={idGroupInputRef}
          />
          <label className="config__label">Breve descripción</label>
          <textarea
            name="descripcion"
            id="descripcion"
            className="config__input"
            rows="4"
            cols="50"
            ref={descriptionInputRef}
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
