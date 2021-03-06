import React from 'react'

export const PrincipalViewScreen = () => {
    return (
        <div className='config__container'>
                <div className='config__text-container'>
                    <div className='config__header'>
                        <h3 className='config__subtitle'>Nuevo Grupo</h3>
                    </div>
                    <h2 className='config__title'></h2>
                    <form>
                        <label className='config__label'>Nombre</label>
                        <input type="text" name='name' id='name' className='config__input'/>
                        <label className='config__label'>Profesor</label>
                        <input type="text" name='profesor' id='profesor' className='config__input'/>
                        <button type="submit" className='config__button'>Crear</button>
                    </form>
                </div>
        </div>
    )
}
