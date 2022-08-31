import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import HeaderLogo from '../HeaderLogo/HeaderLogo';

import accountLogo from '../../images/accountLogo.svg';
import './Navigation.css'

function Navigation({ loggedIn }) {

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

    const openHamburgerMenu = () => {
        setIsHamburgerMenuOpen(true);
    }

    const closeHamburgerMenu = () => {
        setIsHamburgerMenuOpen(false);
    }

    //close by Escape
    React.useEffect(() => {
        const closeByEsc = (evt) => {
            if (evt.key === 'Escape') {
                closeHamburgerMenu();
            }
        }
        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
    }, [])

    return (
        <section className='navigation'>
            {!loggedIn ? (
                <div className='navigation__menu'>

                    <div className='navigation__hamburger'>
                        <HeaderLogo />
                        <HamburgerMenu
                            isOpen={isHamburgerMenuOpen}
                            onClick={openHamburgerMenu}
                            onClose={closeHamburgerMenu}
                        />
                    </div>

                    <div className='naviation__links'>

                        <NavLink className={({ isActive }) =>
                            isActive ? "navigation__link_active" : "naviation__link"
                        } to="/movies">Фильмы</NavLink>

                        <NavLink className={({ isActive }) =>
                            isActive ? "navigation__link_active" : "naviation__link"
                        } to="/saved-movies">Сохранённые фильмы</NavLink>

                        <nav className='navigation__account-data'>
                            <NavLink className={({ isActive }) =>
                                isActive ? "navigation__login-active" : "navigation__login"
                            } to="/profile">Аккаунт</NavLink>

                            <Link className="navigation__account" to="/profile" src={accountLogo} alt='изображение человечка'></Link>
                        </nav>
                    </div>
                </div>
            ) : ("")}
        </section>)

}

export default Navigation;