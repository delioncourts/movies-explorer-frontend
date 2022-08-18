import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderLogo.css';
import headerLogo from '../../images/headerLogo.svg'

function HeaderLogo() {
    return (
        <Link to="/">
            <img className='header__logo' src={headerLogo} alt='Логотип на с буквой s на зеленом фоне' />
        </Link>

    )
}

export default HeaderLogo;