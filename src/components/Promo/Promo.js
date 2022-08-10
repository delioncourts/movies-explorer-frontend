import React from 'react';
import './Promo.css'
import round from '../../images/landingLogo.svg';

function Promo(props) {
    return (
        <section className='promo'>               
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <img className='promo__round' alt='завитушки' src={round} />
        </section>
    )
}

export default Promo;