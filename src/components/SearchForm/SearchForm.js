import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import './SearchForm.css'

function SearchForm({ isSavedMoviesPage, checkboxStatus, handleCheckboxChange, onSearchMovie }) {
    const { isValid, handleChange } = useFormWithValidation({});
    const [searchMovie, setSearchMovie] = useState(keyword);
    const [error, setError] = useState("");
 
    function handleKeyword(evt) {
        handleChange(evt);
        setSearchMovie(evt.target.value);
        if (!isSavedMoviesPage && evt.target.value.length < 1) {
            setError("Нужно ввести ключевое слово");
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!isSavedMoviesPage && searchMovie.length < 1) {
            setError("Нужно ввести ключевое слово");
        } else {
            onSearchMovie(searchMovie);
            setError("");
        }
    }

    return (
        <section className="searchForm">
            <div className="search">

                <form className="search__container" onSubmit={handleSubmit} required>
                    <div className="search__loupe"></div>
                    <input className="search__input"
                        type="text"
                        name="search"
                        placeholder="Фильм"
                        value={searchMovie}
                        onChange={handleKeyword}
                        required />
                    <button className={`search__button ${!isValid && "search__button_disable"}`}
                        type="button"
                        aria-label="поиск"
                        onClick={handleSubmit}
                    ></button>
                </form>

                <Checkbox
                    checkboxStatus={checkboxStatus}
                    handleCheckboxChange={handleCheckboxChange}
                />
            </div>
        </section>
    )
}

export default SearchForm;