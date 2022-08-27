import React, { useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
//import cards from '../../utils/cards';

//хук
import useCurrentWidth from '../../hooks/useCurrentWidth';

import './Movies.css';

import { getInitialCount, getLoadCount } from '../../utils/getLoad'

function Movies ({onSearchMovie, isLoading }) {
    const width = useCurrentWidth();
    const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialCount(width));

    //загрузка карточек
    const handleLoadMore = () => {
        setVisibleMoviesCount((previousCount) => previousCount + getLoadCount(width))
      }

    return (
        <main className='movies'>
            <SearchForm
            onSearchMovie={onSearchMovie}/>
            isLoading ? <div className="movies__preloader">
            <Preloader /> 
          </div> 

            <MoviesCardList
            visibleMoviesCount={visibleMoviesCount}
            handleLoadMore={handleLoadMore}/>
            {/* <Preloader /> */}
        </main>
    );
}

export default Movies;