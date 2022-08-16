import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';
import cards from '../../utils/cards';

function MoviesCardList({ cards }) {
    return (
        <section className='moviesCardList'>
            <div className='moviesCardList__container'>
                {cards.map((card) => {
                    <MoviesCard key={card.id} card={card} />
                })}
            </div>
            <button className='moviesCardList__button' type="button"
                aria-label="Загрузить ещё">Ещё</button>
        </section>
    )
}

export default MoviesCardList;