import React, { useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { useLocation } from 'react-router-dom';

import useFormWithValidation from '../../hooks/useFormWithValidation';

import './SearchForm.css'

function SearchForm({ onSearch }) {
    const { handleChange } = useFormWithValidation();
    const location = useLocation();

    const [request, setRequest] = useState('');
    const [checkboxStatus, setCheckboxStatus] = useState(false);
    //const [disabled, setDisabled] = useState(true);

    const [noSearchResult, setNoSearchResult] = useState(null);

    /*
    //кнопка неактивна
    useEffect(() => {
        const disabled = !isValid;
        setDisabled(disabled);
    }, [isValid]);*/

    useEffect(() => {
        if (location.pathname === '/movies') {
            const checkbox = localStorage.getItem('checkboxStatus');
            const search = localStorage.getItem('request');

            if (search) {
                setRequest(search);
                //setDisabled(!disabled);
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
        onSearch(request, checkboxStatus);
    }

    function handleChangeCheckbox(evt) {
        toggleCheckbox(evt.target.checked);
    }

    function handleRequestChange(evt) {
        handleChange(evt);
        setRequest(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!request) {
            setNoSearchResult('Нужно ввести ключевое слово');
            console.log('Нужно ввести ключевое слово')
        }
        onSearch(request, checkboxStatus);
    }

    //  <span className="search__error-desktop">{!disabled ? "" : "Нужно ввести ключевое слово"}</span>
    //  <span className="search__error-small">{!disabled ? "Нужно ввести ключевое слово" : ""}</span>
    
    return (
        <section className="searchForm">
            <div className="search">

                <form className="search__container"
                    onSubmit={handleSubmit}
                    noValidate>
                    <div className="search__loupe"></div>
                    <input className="search__input"
                        type="text"
                        name="request"
                        placeholder="Фильм"
                        value={request || ''}
                        onChange={handleRequestChange}
                        required />
                    <button
                        className="search__button"
                        type="submit"
                        aria-label="поиск"
                    ></button>
                </form>

                <Checkbox
                    checkboxStatus={checkboxStatus}
                    onChangeCheckbox={handleChangeCheckbox}
                />

            </div>

        </section>
    )
}

export default SearchForm;