import React from 'react'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


import './SavedMovies.css'

function SavedMovies() {
    return (
        <main className='savedMovies'>
            <SearchForm />
            <MoviesCardList />
            {/* <Preloader /> */}
        </main>
    )
}

export default SavedMovies;