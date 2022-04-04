import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import group from "../../assets/img/group.jpg";
export const EditGroupScreen = () => {
  const nameInputRef = useRef();
  const profesorInputRef = useRef();

  const [error, setError] = useState(false);

  const history = useHistory();

  const updateGrupo = (data) => {
    let config = {
      method: "put",
      url: `http://127.0.0.1:8080/api/grupos/${localStorage.getItem(
        "idGrupo"
      )}`,
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClick = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;

    if (enteredName.length === 0) {
      setError(true);
      return;
    }

    const grupo = {
      nombre: enteredName,
      estado: true,
      idProfesor: localStorage.getItem(""),
    };

    updateGrupo(grupo);

    history.push("/group");
  };

  return (
    <div className="config__container">
      <div className="config__image-container">
        <div className="config__fondo">
          <img src={group}></img>
        </div>
      </div>
      <div className="config__text-container">
        <div className="config__header">
          <h3 className="config__subtitle">Editar Grupo</h3>
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
          {/* <label className="config__label">Id Profesor</label>
          <input
            type="text"
            name="profesor"
            id="profesor"
            className="config__input"
            ref={profesorInputRef}
          /> */}
          {error && <p>verifica los campos ingresados</p>}
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
