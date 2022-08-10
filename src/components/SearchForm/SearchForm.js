import React from 'react'

import Checkbox from '../Checkbox/Checkbox';
import './SearchForm.css'

function SearchForm() {
    return (
        <section className='searchForm'>
            <form className='search' name='film-search'>
                <div className='search__container'>
                    <input className='search__input' type='text' placeholder='Фильм'></input>
                    <button className='search__button' type='submit'></button>
                </div>
                <Checkbox />
            </form>
        </section>
    )
}

export default SearchForm;