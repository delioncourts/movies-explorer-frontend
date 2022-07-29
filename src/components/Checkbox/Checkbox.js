import React from 'react';

import './Checkbox.css'



function Checkbox() {
    return (
        <>
            <label className='checkbox'>
                <input name='checkbox' type='checkbox' className='checkbox__filter' defaultChecked />
                <span className='checkbox__slider'></span>
            </label>
            <span className='checkbox__text'>Короткометражки</span>
        </>
    )
}

export default Checkbox;