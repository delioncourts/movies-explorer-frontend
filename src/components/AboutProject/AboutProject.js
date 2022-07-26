import React from 'react';
import './AboutProject.css';

function AboutProject() {
    <secton className='aboutProject'>
        <h2 className='section__title'>О проекте</h2>
        <div className='section__underline'></div>

        <ul className='aboutProject_components'>
            <li className='aboutProject_component'>
                <h3 className='aboutProject_title'>Дипломный проект включал 5 этапов</h3>
                <p className='aboutProject_text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </li>
            <li className='aboutProject_component'>
                <h3 className='aboutProject_title'>На выполнение диплома ушло 5 недель</h3>
                <p className='aboutProject_text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </li>
        </ul>

        <ul className='timeTracker'>
            <li className='timeTracker__component'>
                <div className='timeTracker__backend'>1 неделя</div>
                <p className='timeTracker__text'>Back-end</p>
            </li>
            <li className='timeTracker__component'>
                <div className='timeTracker__frontend'>4 недели</div>
                <p className='timeTracker__text'>Front-end</p>
            </li>
        </ul>
    </secton>
}


export default AboutProject;