import React from 'react'
import { Link } from 'react-router-dom'

export const ResetPassScreen = () => {
    return (
        <div className='auth__container'>
            <div className='auth__image-container'>
                <div className='auth__fondo'>
                </div>
            </div>
            <div className='auth__text-container'>
                <div className='auth__header'>
                    <h3 className='auth__subtitle'>Bienvenido</h3>
                </div>
                <h2 className='auth__title'>¿Olvidaste tu contraseña?</h2>
                <form>
                    <label className='auth__label'>Introduce tu Correo Electrónico</label>
                    <input type="text" placeholder='example@example.com' name='email' id='email' className='auth__input'/>
                    <button type="submit" className='auth__button'>Enviar</button>
                </form>
            </div>
        </div>
    )
}
