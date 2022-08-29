import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


function MoviesCardList({
    movies,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
    loading,
    isSearchDone,
    onRenderMovies,
    moreButtonVisibility,

}) {

    const moreButtonClassName = moreButtonVisibility ? `movieCardList__button` : `movieCardList__button-hidden`;

    return (
        <section className='movieCardList'>
            <div className='movieCardList__container'>
                {movies.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie._id || movie.id}
                        savedMovies={savedMovies}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
                    />
                ))}
            </div>
            {!loading ? isSearchDone
                ? <div className='movieCardList__button'>
                    <button
                        onClick={onRenderMovies}
                        className={moreButtonClassName}
                        aria-label='Загрузить ещё'
                        type='button'>Ещё</button>
                </div>
                : ("")
                : ("")
            }
        </section>
    );
};

export default MoviesCardList;