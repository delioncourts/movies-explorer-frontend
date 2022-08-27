import React from 'react';

import './Checkbox.css'

function Checkbox({ checkboxStatus, handleCheckboxChange }) {
    return (
        <div className='search__checkbox'>
            <label className="checkbox__container">
                <input
                    type="checkbox"
                    name="checkbox"
                    defaultChecked={checkboxStatus}
                    value={checkboxStatus}
                    onChange={handleCheckboxChange} />
                <span className="checkbox__slider"></span>
            </label>
            <span className='checkbox__text'>Короткометражки</span>
        </div>
    )
}

export default Checkbox;