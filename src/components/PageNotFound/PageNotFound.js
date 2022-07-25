import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {

    return (
        <section className='pageNotFound'>
            <div className='pageNotFound__container'>
                <h2 className='pageNotFound__title'>404</h2>
                <p className='pageNotFound__subtitle'>Страница не найдена</p>
            </div>
            <Link className='pageNotFound__link' replace to={-1}>Назад</Link>
        </section>
    )
}

export default PageNotFound;
