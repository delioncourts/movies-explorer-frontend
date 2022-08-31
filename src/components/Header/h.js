import React from "react";
import './Header.css';
import { Link, Routes } from 'react-router-dom';

import HeaderLogo from "../HeaderLogo/HeaderLogo";
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

    return (
        <>
            {(loggedIn) ? (<Navigation  />) : (
                <>
                    <header className='header'>
                        <HeaderLogo />
                        <nav className="header__menu">
                            <Link className="header__register" to='/signup'>Регистрация</Link>
                            <Link className="header__login" to='/signin'>Войти</Link>
                        </nav>
                    </header>
                </>)}
        </>

    )
}

export default Header;