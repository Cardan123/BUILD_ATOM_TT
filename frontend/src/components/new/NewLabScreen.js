import React from 'react'
import newlab from '../../assets/img/newlab.png'
export const NewLabScreen = () => {
    return (
        <div className='config__container'>
            <div className='config__image-container'>
                <div className='config__fondo'>
                    <img src={newlab}></img>
                </div>
            </div>
            <div className='config__text-container'>
                <div className='config__header'>
                    <h3 className='config__subtitle'>Nuevo Laboratorio</h3>
                </div>
                <h2 className='config__title'></h2>
                <form>
                    <label className='config__label'>Nombre</label>
                    <input type="text" name='name' id='name' className='config__input'/>
                    <label className='config__label'>Profesor</label>
                    <input type="text" name='profesor' id='profesor' className='config__input'/>
                    <label className='config__label'>Breve descripción</label>
                    <textarea name='descripcion' id='descripcion' className='config__input' rows="4" cols="50"/>
                    <button type="submit" className='config__button'>Crear</button>
                </form>
            </div>
        </div>
)
}
