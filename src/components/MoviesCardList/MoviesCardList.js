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
    moreLoadingButton,
}) {

    const moreLoadingButtonClass = moreLoadingButton ? `movieCardList__button` : `movieCardList__button-hidden`;

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
                ? <>
                    <button
                        onClick={onRenderMovies}
                        className={moreLoadingButtonClass}
                        aria-label='Загрузить ещё'
                        type='button'>Ещё</button>
                </>
                : ("")
                : ("")
            }
        </section>
    );
};

export default MoviesCardList;