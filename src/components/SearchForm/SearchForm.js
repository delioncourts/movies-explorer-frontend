import React from 'react';
import Checkbox from '../Checkbox/Checkbox';


import './SearchForm.css'

function SearchForm() {
    return (
        <section className="searchForm">
            <div className="search">

                <form className="search__container">
                    <div className="search__loupe"></div>
                    <input className="search__input" type="text" name="search" placeholder="Фильм" required />
                    <button className="search__button" type="button" aria-label="поиск"></button>
                </form>

                <Checkbox />
            </div>
        </section>
    )
}

export default SearchForm;