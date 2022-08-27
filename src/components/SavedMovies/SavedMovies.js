import React from 'react'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'

import './SavedMovies.css'

function SavedMovies({ 
    handleSearchSavedMovie, 
    savedMovies, 
    isLoading, 
    isSearchDone, 
    filteredSavedMovies, 
    onDeleteMovie }) {
    return (
        <main className='savedMovies'>
            <SearchForm
                onSearch={handleSearchSavedMovie}
            />
            {isLoading ?
                <div className="savedMovies__preloader">
                    <Preloader />
                </div>
                : isSearchDone
                    ? filteredSavedMovies.length > 0
                        ?
                        <MoviesCardList
                            movies={filteredSavedMovies}
                            savedMovies={savedMovies}
                            onDeleteMovie={onDeleteMovie}
                        />
                        : (
                            <div className="savedMovies__container">
                                <span className="savedMovies__text">Ничего не найдено</span>
                            </div>
                        )
                    : (
                        <MoviesCardList
                            movies={savedMovies}
                            savedMovies={savedMovies}
                            onDeleteMovie={onDeleteMovie}
                        />
                    )
            }

        </main>
    )
}

export default SavedMovies;