import React from "react";
import tabla from "../Assets/tabla-periodica.png";
import "./Tabla.css";
export function Tabla(props) {
  return (
    <div className="tabla">
      <img className="imagen" src={tabla} alt="Tabla periodica" />
      <b>x: {props.datos.xpos}</b>
      <b>y: {props.datos.ypos}</b>
    </div>
  );
}
