import React from 'react'
import './Portfolio.css'


function Portfolio() {
    return (
        <section className='portfolio'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <ul className='portfolio__components'>
                <li className='portfolio__component'><a className='portfolio__link' src='https://github.com/delioncourts/how-to-learn' target='_blank' rel='noopener noreferrer'>Статичный сайт</a></li>
                <li className='portfolio__component'><a className='portfolio__link' src='https://github.com/delioncourts/russian-travel' target='_blank' rel='noopener noreferrer'>Адаптивный сайт</a></li>
                <li className='portfolio__component'><a className='portfolio__link' src='https://github.com/delioncourts/react-mesto-api-full' target='_blank' rel='noopener noreferrer'>Одностраничное приложение</a></li>
            </ul>
        </section>
    )
}

export default Portfolio;