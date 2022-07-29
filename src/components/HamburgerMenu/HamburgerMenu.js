import React from 'react';
import { Link } from "react-router-dom";

import accountLogo from '../../images/accountLogo.svg';

import './HamburgerMenu.css'

function HamburgerMenu({ onClick, isOpen, onClose }) {

    const hamburgerButton = `hamburger-menu__visible ${isOpen ? 'hamburger-menu__hidden' : 'hamburger-menu__visible'}`;

    const hamburgerActive = `hamburger-menu ${isOpen ? 'hamburger-menu__active' : ' '}`;

    return (
        <>
            <button className={hamburgerButton}
                onClick={onClick}
            />
            <div className={hamburgerActive}>
                <button className="hamburger-menu__close" onClick={onClose} />
                <nav className="hamburger-menu__links">
                    <Link className="hamburger-menu__link" to="/">Главная</Link>
                    <Link className="hamburger-menu__link hamburger-menu__link_active" to="/movies">Фильмы</Link>
                    <Link className="hamburger-menu__link" to="/saved-movies">Сохранённые фильмы</Link>
                </nav>
                <nav className='hamburger-menu__footer'>
                    <Link className="hamburger-menu__login" to="/profile">Аккаунт</Link>
                    <Link className="hamburger-menu__account" to="/profile" src={accountLogo}></Link>
                </nav>
            </div>
        </>
    )
}

export default HamburgerMenu;