import React from 'react';
import tabla from '../Assets/tabla-periodica.png';
import './Tabla.css';
import data from "./PeriodicTableJSON.json";

const colorMap = {
  "noble gas": "#FFBC42",
  "alkaline earth metal": "#EC674E",
  "diatomic nonmetal": "#D81159",
  "alkali metal": "#8F2D56",
  "transition metal": "#58586B",
  "post-transition metal": "#218380",
  lanthanide: "#4AABAF",
  metalloid: "#73D2DE",
};

export function Tabla(props) {
  return (
      <div className='tabla'>
        <div className="table">
          {data.elements.map((element) => (
          <div
          className='element'
          key={element.name}
          style={{
            gridColumn: element.xpos,
            gridRow: element.ypos,
            borderColor: colorMap[element.category],
            backgroundColor: (element.ypos===props.datos.ypos && element.xpos===props.datos.xpos ) ? "red" : "white",
          }}
          >
          <strong>{element.symbol}</strong>
          <small className="number">{element.number}</small>
          <small className="name">{element.name}</small>
            </div>
          ))}
        </div>
    </div>
  );
}
