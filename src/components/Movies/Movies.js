import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'

import './Movies.css';

function Movies({
    onSearch,
    loading,
    isSearchDone,
    searchStatus,
    renderedMovies,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
    moreLoadingButton,
    onRenderMovies,
}) {

    return (
        <main className='movies'>
            <SearchForm
                onSearch={onSearch} />
            {loading ?
                <div className="movies__preloader">
                    <Preloader />
                </div>
                : isSearchDone
                    ? renderedMovies.length > 0
                        ? <MoviesCardList
                            movies={renderedMovies}
                            savedMovies={savedMovies}
                            onSaveMovie={onSaveMovie}
                            onDeleteMovie={onDeleteMovie}
                            loading={loading}
                            isSearchDone={isSearchDone}
                            onRenderMovies={onRenderMovies}
                            moreLoadingButton={moreLoadingButton}
                        />
                        : (!loading ?
                            <div className="movies__container">
                                <span className="movies__text">Ничего не найдено</span>
                            </div>
                            :
                            <div className="movies__container">
                                <span className="movies__text">{searchStatus}</span>
                            </div>
                        )
                    : ("")
            }
        </main>

    );
}

export default Movies;