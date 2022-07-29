import React from 'react';
import './AboutMe.css';

import photo from '../../images/aboutMePhoto.svg';

function AboutMe(props) {
    <secton className='aboutMe'>
        <h2 className='aboutMe__section__title'>Студент</h2>
        <div className='aboutMe__section__underline'></div>
        <div className='aboutMe__components'>
            <div className='aboutMe__info'>
                <h3 className='aboutMe__name'>Вероника</h3>
                <p className='aboutMe__description'>Фронтенд-разработчик, 30 лет</p>
                <p className='aboutMe__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                <ul className='aboutMe__links'>
                    <li><a className='aboutMe__link' href='https://t.me/mysterynotsolved' target='_blank' rel='noreffer noopener'>Telegram</a></li>
                    <li><a className='aboutMe__link' href='https://github.com/delioncourts' target='_blank' rel='noreffer noopener'>Github</a></li>
                </ul>
            </div>
            <img className='aboutMe__photo' src={photo} alt='Фотография' />
        </div>
    </secton>
}

export default AboutMe;