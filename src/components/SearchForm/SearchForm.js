import React, { useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { useLocation } from 'react-router-dom';

import useFormWithValidation from '../../hooks/useFormWithValidation';

import './SearchForm.css'

function SearchForm({ onSearchMovie }) {
    const { isValid, handleChange } = useFormWithValidation();
    const location = useLocation();

    const [request, setRequest] = useState('');
    const [checkboxStatus, setCheckboxStatus] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    //кнопка неактивна
    useEffect(() => {
        const buttonDisabled = !isValid;
        setButtonDisabled(buttonDisabled);
    }, [isValid]);

    useEffect(() => {
        if (location.pathname === '/movies') {
            const checkbox = localStorage.getItem('checkboxStatus');
            const search = localStorage.getItem('request');

            if (search) {
                setRequest(search);
                setButtonDisabled(!buttonDisabled);
            }
            if (JSON.parse(checkbox) === true) {
                setCheckboxStatus(true);
            } else {
                setCheckboxStatus(false);
            }
        }
    }, [location.pathname]);

    //чекбокс
    function toggleCheckbox(checkboxStatus) {
        setCheckboxStatus(checkboxStatus);
        onSearchMovie(request, checkboxStatus);
    }

    function handleCheckboxChange(evt) {
        toggleCheckbox(evt.target.checked);
    }

    function handleRequestChange(evt) {
        handleChange(evt);
        setRequest(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSearchMovie(request, checkboxStatus);
    }

    return (
        <section className="searchForm">
            <div className="search">

                <form className="search__container"
                    onSubmit={handleSubmit}
                    required>
                    <div className="search__loupe"></div>
                    <input className="search__input"
                        type="text"
                        name="request"
                        placeholder="Фильм"
                        value={request || ''}
                        onChange={handleRequestChange}
                        required />
                    <button buttonDisabled={buttonDisabled}
                        type="button"
                        aria-label="поиск"
                    ></button>
                </form>
                <span className="search__error-desktop">{!buttonDisabled ? "" : "Нужно ввести ключевое слово"}</span>

                <Checkbox
                    checkboxStatus={checkboxStatus}
                    onChangeCheckbox={handleCheckboxChange}
                />
            </div>
            <span className="search__input-error_small">{!buttonDisabled ? "" : "Нужно ввести ключевое слово"}</span>
        </section>
    )
}

export default SearchForm;