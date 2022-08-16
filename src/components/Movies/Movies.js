import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/cards';
import './Movies.css';

/*<MoviesCardList cards={cards} />*/
function Movies() {
    return (
        <main className='movies'>
            <SearchForm />
        </main>
    )
}

export default Movies;