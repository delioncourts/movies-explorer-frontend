import React from 'react';

import './Checkbox.css'

function Checkbox({ checkboxInfo, handleCheckboxChange }) {
    return (
        <div className='search__checkbox'>
            <label className="checkbox__container">
                <input
                    type="checkbox"
                    name="checkbox"
                    defaultChecked={checkboxInfo}
                    value={checkboxInfo}
                    onChange={handleCheckboxChange} />
                <span className="checkbox__slider"></span>
            </label>
            <span className='checkbox__text'>Короткометражки</span>
        </div>
    )
}

export default Checkbox;