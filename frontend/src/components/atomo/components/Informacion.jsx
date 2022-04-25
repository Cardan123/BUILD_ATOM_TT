import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import './Informacion.css'
export function Informacion(props) {
  return (
      <div className='contenedor'>
        <div className='Descubierto'>Descubierto por: {props.datos.discovered_by}</div>
        <div className='Nombrado'>Nombrado por: {props.datos.named_by}</div>
        <div className='Densidad'>Densidad: {props.datos.density}</div>
        <div className='Masa'>Masa Atomica: {props.datos.atomic_mass}</div>
      </div>
  )
}
