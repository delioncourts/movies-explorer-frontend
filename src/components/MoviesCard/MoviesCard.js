import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';
import deleteFilmButton from '../../images/deleteFilmButton.svg';
import saveButton from '../../images/saveButton.svg';
import heartNotLiked from '../../images/heartNotLiked.svg';

import { MOVIE_LINK } from '../../utils/constants';

const MoviesCard = ({ movie, savedMovies, onSaveMovie, onDeleteMovie }) => {
    const location = useLocation();
    const savedMovie = savedMovies.find((m) => m.movieId === movie.id);
    const isSaved = movie.id ? savedMovie.map((i) => i.movieId).includes(movie.id)
        : location.pathname === '/saved-movies' ? true : '';
    const moreLoadingButtonClass = !savedMovie ? `movieCardList__button` : `movieCardList__button-hidden`;

    //длительность фильма 
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;

    //открыть фильм в новом окне 
    function onClickLink(url) {
        return () => window.open(url, '_blank', 'noopener noreferrer')
    }

    //удалить фильм
    function handleDeleteMovie() {
        onDeleteMovie(movie);
    }

    //сохранить фильм
    function handleSaveMovie() {
        if (!savedMovie) {
            onSaveMovie({
                country: String(movie.country),
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `${MOVIE_LINK}${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `${MOVIE_LINK}${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            });
        } else {
            onDeleteMovie(savedMovies.filter((m) => m.movieId === movie.id)[0]);
        }
    }

    return (
        <div className='moviesCard'>

            <a className='moviesCard__link'
                href={movie.trailerLink}
                onClick={onClickLink}
            >
                <img className='moviesCard__poster'
                    src={movie.image}
                    alt={`Постер фильма ${movie.nameRU}`}
                />
            </a>
            <div className='moviesCard__container'>
                <h2 className='moviesCard__title'>{movie.nameRU}</h2>

                {location.pathname === '/saved-movies' &&
                    <button type='button'
                        aria-label='удалить фильм'
                        className='moviesCard__button'
                        onClick={handleDeleteMovie}
                    >
                        <img className='moviesCard__click'
                            alt='удалить'
                            src={deleteFilmButton} />
                    </button>}

                {location.pathname === '/movies' &&
                    <button type='button'
                        aria-label='сохранить'
                        className={moreLoadingButtonClass}
                        onClick={handleSaveMovie}
                    >

                        {isSaved ? <img className='moviesCard__click'
                            alt='добавлено'
                            src={saveButton} /> :
                            <img className='moviesCard__add'
                                alt='добавить'
                                src={heartNotLiked} />}</button>}
            </div>

            <p className='moviesCard__duration'>{hours !== 0 ? `${hours}ч` : ""} {minutes !== 0 ? `${minutes}м` : ""}</p>

        </div>
    );
};

export default MoviesCard;