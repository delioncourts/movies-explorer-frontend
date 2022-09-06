import React from 'react';
import {NavLink, useNavigate } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
    const navigate = useNavigate();

    return (
        <section className='pageNotFound'>
            <div className='pageNotFound__container'>
                <h2 className='pageNotFound__title'>404</h2>
                <p className='pageNotFound__subtitle'>Страница не найдена</p>
                <NavLink className='pageNotFound__link' onClick={() => navigate(-1)}>Назад</NavLink>
            </div>
        </section>
    )
}

export default PageNotFound;
