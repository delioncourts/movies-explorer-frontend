import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';
import deleteFilmButton from '../../images/deleteFilmButton.svg';
import saveButton from '../../images/saveButton.svg';
import heartNotLiked from '../../images/heartNotLiked.svg';

const MoviesCard = ({ movie, savedMovies, image, nameRU, trailerLink, deleteMovieItem, onMovieSave, buttonDisabled }) => {
    const location = useLocation();
    const isSaved = movie.id ? savedMovies.map((i)=>i.movieId).includes(movie.id) 
    : location.pathname==='/saved-movies' ? true : '';

    //длительность фильма 
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;

    //открыть фильм в новом окне 
    function onClickLink(url) {
        return () => window.open(url, '_blank', 'noopener', 'noreferrer')
    }

    //удалить фильм
    function handleDelete() {
        if (location.pathname === '/saved-movies') {
            deleteMovieItem(movie)
        }
        if (location.pathname === '/movies')
        deleteMovieItem(savedMovies.find((i) => i.movieId === movie.id))
    }
   
    //сохранить фильм
    function handleSaveMovie(evt) {
        evt.preventDefault();
        onMovieSave(movie);
    }

    return (
        <div className='moviesCard'>

            <a className='moviesCard__link'
                href={trailerLink}
                onClick={onClickLink}
            >
                <img className='moviesCard__poster'
                    src={image}
                    alt={`Постер фильма ${nameRU}`}
                />
            </a>
            <div className='moviesCard__container'>
                <h2 className='moviesCard__title'>{nameRU}</h2>

                {location.pathname === '/saved-movies' &&
                    <button type='button'
                        aria-label='удалить фильм'
                        className='moviesCard__button'
                        onClick={handleDelete}
                        disabled={buttonDisabled ? true : false}
                    >

                        <img className='moviesCard__click'
                            alt='удалить'
                            src={deleteFilmButton} />
                    </button>}

                {location.pathname === '/movies' &&
                    <button type='button'
                        aria-label='сохранить'
                        className={isSaved ? 'moviesCard__button' : 'moviesCard__button'}
                        onClick={isSaved ? handleDelete : handleSaveMovie}
                        disabled={buttonDisabled ? true : false}
                    >

                        {isSaved ? <img className='moviesCard__click'
                            alt='добавлено' s
                            rc={saveButton} /> :
                            <img className='moviesCard__add'
                                alt='добавить'
                                src={heartNotLiked} />}</button>}
            </div>

            <p className='moviesCard__duration'>{hours !== 0 ? `${hours}ч` : ""} {minutes !== 0 ? `${minutes}м` : ""}</p>

        </div>
    );
};

export default MoviesCard;