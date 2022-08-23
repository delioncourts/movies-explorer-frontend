import React from 'react';
import './AboutMe.css';

import photo from '../../images/myPhoto.svg';

function AboutMe(props) {
    return (
        <section className='aboutMe'>
            <h2 className='aboutMe__section__title'>Студент</h2>
            <div className='aboutMe__section__underline'></div>
            <div className='aboutMe__components'>
                <div className='aboutMe__info'>
                    <h3 className='aboutMe__name'>Вероника</h3>
                    <p className='aboutMe__description'>Фронтенд-разработчик, 26 лет</p>
                    <p className='aboutMe__text'>Я родилась и живу в Москве, закончила магистратуру МГУ по направлению "Стратегический менеджмент и инновации". Я люблю слушать музыку и собирать плейлисты под настроение.
                        Также я люблю творчество Дэвида Линча (the owls are not what they seem) и интересуюсь биографией Сергея Дягилева. В школе увлекалась программированием и создавала свои небольшие сайты.
                        Осенью 2021 стала учиться в Яндекс.Практикуме на факультете веб-разаботки. </p>
                    <ul className='aboutMe__links'>
                        <li><a className='aboutMe__link' href='https://t.me/mysterynotsolved' target='_blank' rel="noreferrer" >Telegram</a></li>
                        <li><a className='aboutMe__link' href='https://github.com/delioncourts' target='_blank' rel="noreferrer" >Github</a></li>
                    </ul>
                </div>
                <img className='aboutMe__photo' src={photo} alt='Фотография' />
            </div>
        </section>)
}

export default AboutMe;