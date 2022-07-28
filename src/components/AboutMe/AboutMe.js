import React from 'react';
import './AboutMe.css';

import photo from '../../images/aboutMePhoto.svg';

function AboutMe() {
    <secton className='aboutMe'>
        <h2 className='section__title'>Студент</h2>
        <div className='section__underline'></div>
        <div className='aboutMe__components'>
            <div className='aboutMe__info'>
                <h3 className='aboutMe__name'>Вероника</h3>
                <p className='aboutMe__description'>Фронтенд-разработчик, 30 лет</p>
                <p className='aboutMe__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                <ul className='aboutMe__links'>
                    <li className='aboutMe__link'><a href='https://t.me/mysterynotsolved' target='_blank' rel='noreffer'>Telegram</a></li>
                    <li className='aboutMe__link'><a href='https://github.com/delioncourts' target='_blank' rel='noreffer'>Github</a></li>
                </ul>
            </div>
            <img className='aboutMe__photo' src={photo} alt='Фотография' />
        </div>
    </secton>
}

export default AboutMe;