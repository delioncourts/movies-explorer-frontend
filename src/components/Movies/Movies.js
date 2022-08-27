import React, { useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'
//import cards from '../../utils/cards';

//хук
import useCurrentWidth from '../../hooks/useCurrentWidth';

import './Movies.css';

import { getInitialCount, getLoadCount } from '../../utils/getLoad'

function Movies({
    onSearchMovie,
    isLoading,
    isSearchDone,
    searchStatus,
    renderedMovies,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
    moreLoading,
    onRenderMovies }) {
    const width = useCurrentWidth();
    const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialCount(width));

    //загрузка карточек
    const handleLoadMore = () => {
        setVisibleMoviesCount((previousCount) => previousCount + getLoadCount(width))
    }

    return (
        <main className='movies'>
            <SearchForm
                onSearchMovie={onSearchMovie} />
            {isLoading ?
                <div className="movies__preloader">
                    <Preloader />
                </div>
                : isSearchDone
                    ? renderedMovies.length > 0
                        ? <MoviesCardList
                            visibleMoviesCount={visibleMoviesCount}
                            handleLoadMore={handleLoadMore}
                            isLoading={isLoading}
                            moreLoading={moreLoading}
                            movies={renderedMovies}
                            savedMovies={savedMovies}
                            onSaveMovie={onSaveMovie}
                            onDeleteMovie={onDeleteMovie}
                            isSearchDone={isSearchDone}
                            onRenderMovies={onRenderMovies} />
                        : (!isLoading ?
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