import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import cards from '../../utils/cards';
import './MoviesCard.css';
import deleteFilmButton from '../../images/deleteFilmButton.svg';
import saveButton from '../../images/saveButton.svg';

function MoviesCard({ card }) {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);

    function handleSave() {
        setIsSaved(!isSaved);
    }

    return (
        <div className='moviesCard'>

            <div className='moviesCard__description'>
                <h2 className='moviesCard__title'>{card.name}</h2>
                <p className='moviesCard__duration'>{card.time}</p>
            </div>

            <img className='moviesCard__image' src={card.image} alt='постер' />

            {location.pathname === '/saved-movies' &&

                <button className='moviesCard__button'
                    onClick={handleSave}
                    type="button"
                    aria-label="Сохранить фильм">

                    <img className='moviesCard__delete' src={deleteFilmButton} alt='удалить' />
                </button>}

            {location.pathname === '/movies' &&
                <button className={isSaved ?
                    'moviesCard__button moviesCard__button_like' : 'moviesCard__button'}
                    onClick={handleSave}>
                    {isSaved ? <img className='moviesCard__save' alt='сохранить фильм' src={saveButton} /> :
                        <p className='moviesCard__text'>Сохранить</p>}</button>}
        </div>
    )
}

export default MoviesCard;