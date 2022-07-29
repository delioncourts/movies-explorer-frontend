import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <footer className='footer'>
            <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__content'>
                <p className='footer__copyright'>&copy; 2022</p>
                <ul className='footer_links'>
                    <li className='footer__link'><a href='https://practicum.yandex.ru' target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a></li>
                    <li className='footer__link'><a href='https://github.com/delioncourts' target='_blank' rel='noopener noreferrer'>Github</a></li>
                    <li className='footer__link'><a href='https://t.me/mysterynotsolved' target='_blank' rel='noopener noreferrer'>Telegram</a></li>
                </ul>
            </div>
        </footer>
    )
}
export default Footer;