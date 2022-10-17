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
                    <p className='aboutMe__text'>Я родилась и живу в Москве, закончила магистратуру МГУ по направлению "Стратегический менеджмент и инновации". Осенью 2021 стала учиться в Яндекс.Практикуме на факультете веб-разработки и успешно завершила обучение в сентябре 2022. Люблю работать со сложными структурами и стараюсь оптимизировать любую систему. Во время обучения мне было интересно находить решения для сложных задач, в этом мне помогал аналитический склад ума. Сейчас я совершенствую знания React и дополнительно изучаю TypeScript. Также я люблю творчество Дэвида Линча (the owls are not what they seem).</p>
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