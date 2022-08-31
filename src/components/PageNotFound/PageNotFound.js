import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
    const navigate = useNavigate();

    function handleGoBack() {
        navigate(-1)
    }

    return (
        <section className='pageNotFound'>
            <div className='pageNotFound__container'>
                <h2 className='pageNotFound__title'>404</h2>
                <p className='pageNotFound__subtitle'>Страница не найдена</p>
                <Link className='pageNotFound__link' to="" onClick={handleGoBack}>Назад</Link>
            </div>
        </section>
    )
}

export default PageNotFound;
