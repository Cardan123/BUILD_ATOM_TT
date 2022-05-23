import React, { Fragment, useState } from "react";
import { Tabla } from "./components/Tabla.jsx";
import { Atomo } from "./components/Atomo";
import { Cubeta } from "./components/Cubeta";
import { Elemento } from "./components/Elemento";
import { Informacion } from "./components/Informacion";
import "./App.css";
import axios from "axios";

class MainAtomo extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);

    this.state = {
      name: " ",
      appearance: " ",
      atomic_mass: 0.0,
      boil: 0.0,
      category: " ",
      color: null,
      density: 0.0,
      discovered_by: " ",
      melt: 0.0,
      molar_heat: 0.0,
      named_by: " ",
      number: 0,
      period: 0,
      phase: " ",
      source: " ",
      spectral_img: " ",
      summary: " ",
      symbol: " ",
      xpos: 0,
      ypos: 0,
      shells: [0],
      electron_configuration: " ",
      electron_configuration_semantic: " ",
      electron_affinity: 0.0,
      electronegativity_pauling: 0.0,
      ionization_energies: [0],
      "cpk-hex": "000000",
      nProtones: 0,
      nElectrones: 0,
      nNeutrones: 0,
    };
  }

  handler(elemento_actual, electrones, protones, neutrones) {
    this.setState(elemento_actual);
    this.setState({ nProtones: protones });
    this.setState({ nElectrones: electrones });
    this.setState({ nNeutrones: neutrones });
  }

  async handleClick() {
    if (localStorage.getItem("typeExercise") === "Create") {
      let DatosEnvio = {
        nProtones: this.state.nProtones,
        nElectrones: this.state.nElectrones,
        nNeutrones: this.state.nNeutrones,
      };

      let config = {
        method: "put",
        url: `http://127.0.0.1:8080/api/ejercicios/${localStorage.getItem(
          "idEjercicio"
        )}`,
        headers: {},
        data: DatosEnvio,
      };

      const response = await axios(config);
      console.log(response);
    } else {
      let DatosEnvio = {
        nombre: localStorage.getItem("EjercicioNombre"),
        nProtones: this.state.nProtones,
        nElectrones: this.state.nElectrones,
        nNeutrones: this.state.nNeutrones,
        idEjercicio: localStorage.getItem("idEjercicio"),
      };

      let config = {
        method: "post",
        url: `http://127.0.0.1:8080/api/atomos/`,
        headers: {},
        data: DatosEnvio,
      };

      let response = await axios(config);
      let atomo = response.data.atomo;

      config = {
        method: "get",
        url: `http://127.0.0.1:8080/api/ejercicios/${localStorage.getItem(
          "idEjercicio"
        )}`,
        headers: {},
      };

      response = await axios(config);
      let ejercicio = response.data.ejercicio;
      let calificacion = 0;

      if (
        this.state.nProtones === ejercicio.nProtones &&
        this.state.nElectrones === ejercicio.nElectrones &&
        this.state.nNeutrones === ejercicio.nNeutrones
      ) {
        calificacion = 10;
      }

      DatosEnvio = {
        puntuaje: calificacion,
        observacion: "sin observacion",
        idEjercicio: localStorage.getItem("idEjercicio"),
        idAlumno: localStorage.getItem("id"),
        idAtomo: atomo.id,
      };

      config = {
        method: "post",
        url: `http://127.0.0.1:8080/api/calificaciones`,
        headers: {},
        data: DatosEnvio,
      };

      response = await axios(config);
    }

    // history.push("/laboratories/do");
  }

  render() {
    return (
      <div className="config__main">
        <div className="config-box-container">
          <div id="cartaprincipalatomos" className="carta">
          <p id="labelprincipal">Arrastra las particulas subatomicas hacia el atomo, hasta crear el elemento que necesitas</p>
            <Cubeta handler={this.handler} />
            <Tabla datos={this.state} />
            <Elemento datos={this.state} />
            <Informacion datos={this.state} />
            <a
              href="/group/evaluate"
              className="guardar123"
              onClick={() => {
                this.handleClick(this.state);
              }}
            >
              Guardar
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MainAtomo;
