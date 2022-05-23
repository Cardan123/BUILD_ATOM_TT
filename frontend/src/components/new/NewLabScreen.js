import axios from "axios";
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import newlab from "../../assets/img/newlab.png";
export const NewLabScreen = () => {
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();

  const [error, setError] = useState(false);

  const history = useHistory();

  const insertLab = async (data) => {
    let config = {
      method: "post",
      url: "http://127.0.0.1:8080/api/laboratorios",
      headers: {},
      data: data,
    };

    await axios(config);

    history.push("/group/laboratories");
  };

  const handleClick = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (enteredName.length === 0 || descriptionInputRef === 0) {
      setError(true);
      return;
    }

    const laboratorio = {
      nombre: enteredName,
      descripcion: enteredDescription,
      idGrupo: localStorage.getItem("idGrupo"),
    };

    insertLab(laboratorio);
  };

  return (
    <div id="contenedorNuevoLab" className="config__container">
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
