import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';
import deleteFilmButton from '../../images/deleteFilmButton.svg';
import saveButton from '../../images/saveButton.svg';
import heartNotLiked from '../../images/heartNotLiked.svg';

const MoviesCard = ({ card }) => {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);

    function handleClick() {
        setIsSaved(!isSaved);
    }

    return (
        <div className='moviesCard'>
            <img className='moviesCard__poster' src={card.image} alt='постер фильма' />

            <div className='moviesCard__container'>
                <h2 className='moviesCard__title'>{card.name}</h2>

                {location.pathname === '/saved-movies' &&
                    <button type='button' aria-label='удалить фильм' className='moviesCard__button' onClick={handleClick}>
                        <img className='moviesCard__click' alt='удалить' src={deleteFilmButton} />
                    </button>}

                {location.pathname === '/movies' &&
                    <button type='button' aria-label='сохранить' className={isSaved ? 'moviesCard__button' : 'moviesCard__button'}
                        onClick={handleClick}>
                        {isSaved ? <img className='moviesCard__click' alt='добавлено' src={saveButton} /> :
                            <img className='moviesCard__add' alt='добавить' src={heartNotLiked} />}</button>}
            </div>

            <p className='moviesCard__duration'>{card.time}</p>

        </div>
    );
};

export default MoviesCard;