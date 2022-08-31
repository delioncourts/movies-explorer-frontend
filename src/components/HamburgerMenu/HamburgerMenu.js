import React from 'react';
import { Link, NavLink } from "react-router-dom";

import accountLogo from '../../images/accountLogo.svg';

import './HamburgerMenu.css'

function HamburgerMenu({ onClick, isOpen, onClose }) {

    const hamburgerButton = `hamburger-menu__visible ${isOpen ? 'hamburger-menu__hidden' : 'hamburger-menu__visible'}`;

    const hamburgerActive = `hamburger-menu ${isOpen ? 'hamburger-menu__active' : ' '}`;
    //<NavLink className="hamburger-menu__link" activeClassName="hamburger-menu__link_active" to="/movies">Фильмы</NavLink>
    //<NavLink className="hamburger-menu__link" activeClassName="hamburger-menu__link_active" to="/saved-movies">Сохранённые фильмы</NavLink>


    return (
        <>
            <button className={hamburgerButton}
                onClick={onClick}
            />
            <div className={hamburgerActive}>
                <button className="hamburger-menu__close" onClick={onClose} />
                <nav className="hamburger-menu__links">
                    <Link className="hamburger-menu__link" to="/">Главная</Link>
                    <NavLink className={({ isActive }) =>
                        isActive ? "hamburger-menu__link_active" : "hamburger-menu__link"
                    } to="/movies">Фильмы</NavLink>

                    <NavLink className={({ isActive }) =>
                        isActive ? "hamburger-menu__link_active" : "hamburger-menu__link"
                    } to="/saved-movies">Сохранённые фильмы</NavLink>
                </nav>
                <nav className='hamburger-menu__footer'>
                    <Link className="hamburger-menu__login" to="/profile">Аккаунт</Link>
                    <Link className="hamburger-menu__account" to="/profile" src={accountLogo} alt='изображение человечка'></Link>
                </nav>
            </div>

        </>
    )
}

export default HamburgerMenu;