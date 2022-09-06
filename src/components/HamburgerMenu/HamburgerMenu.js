import React from 'react';
import { Link, NavLink } from "react-router-dom";

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
                    <NavLink className={({ isActive }) =>
                        isActive ? "hamburger-menu__link_active" : "hamburger-menu__link"
                    } to="/">Главная</NavLink>

                    <NavLink className={({ isActive }) =>
                        isActive ? "hamburger-menu__link_active" : "hamburger-menu__link"
                    } to="/movies">Фильмы</NavLink>

                    <NavLink className={({ isActive }) =>
                        isActive ? "hamburger-menu__link_active" : "hamburger-menu__link"
                    } to="/saved-movies">Сохранённые фильмы</NavLink>
                </nav>
                <nav className='hamburger-menu__footer'>
                    <NavLink className={({ isActive }) =>
                        isActive ? "hamburger-menu__login-active" : "hamburger-menu__login"
                    } to="/profile">Аккаунт</NavLink>

                    <Link className="hamburger-menu__account" to="/profile" src={accountLogo} alt='изображение человечка'></Link>
                </nav>
            </div>

        </>
    )
}

export default HamburgerMenu;