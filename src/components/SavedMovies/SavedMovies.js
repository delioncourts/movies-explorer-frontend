import React from 'react'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/cards';
import './SavedMovies.css'

function SavedMovies() {
    return (
        <main className='savedMovies'>
            <SearchForm />
            <MoviesCardList cards={cards} />
        </main>
    )
}

export default SavedMovies;