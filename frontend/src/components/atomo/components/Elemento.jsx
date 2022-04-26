import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import './Elemento.css'

export function Elemento(props) {
  return (
      <div className='contenedorelemento'>
          <div className='elemento'>
          <div className='numeroatomico'>{props.datos.number}</div>
          <div className='masaatomica'>{props.datos.atomic_mass.toFixed(2)}</div>
          <div className='simbolo'>{props.datos.symbol}</div>
          <div className='nombreelemento'>{props.datos.name}</div>
          </div>
    </div>
  )
}
