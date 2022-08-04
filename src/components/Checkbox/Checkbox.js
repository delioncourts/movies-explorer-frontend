import React from 'react';

import './Checkbox.css'

function Checkbox() {
    return (
        <div className='checkbox'>
            <label className='checkbox__container'>
                <input name='checkbox' type='checkbox' className='checkbox__filter' defaultChecked />
                <span className='checkbox__slider'></span>
            </label>
            <span className='checkbox__text'>Короткометражки</span>
        </div>
    )
}

export default Checkbox;