import React from 'react';

import './Checkbox.css'

function Checkbox({ checkboxStatus, onChangeCheckbox }) {
    return (
        <div className='search__checkbox'>
            <label className="checkbox__container">
                <input
                    type="checkbox"
                    name="checkbox"
                    defaultChecked={checkboxStatus}
                    value={checkboxStatus}
                    onChange={onChangeCheckbox} />
                <span className="checkbox__slider"></span>
            </label>
            <span className='checkbox__text'>Короткометражки</span>
        </div>
    )
}

export default Checkbox;