import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import HeaderLogo from '../HeaderLogo/HeaderLogo';

import accountLogo from '../../images/accountLogo.svg';
import './Navigation.css'

/*                  
<HamburgerMenu
isOpen={isHamburgerMenuOpen}
onClick={openHamburgerMenu}
onClose={closeHamburgerMenu}
/> 
*/

function Navigation() {

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
                    <Link className='naviation__link navigation__link_active' to='/movies'>Фильмы</Link>
                    <Link className='naviation__link' to='/saved-movies'>Сохранённые фильмы</Link>

                    <nav className='navigation__account-data'>
                        <Link className="navigation__login" to="/profile">Аккаунт</Link>
                        <Link className="navigation__account" to="/profile"  src={accountLogo} alt='изображение человечка'></Link>
                    </nav>
                </div>
            </div>
        </section>
    )
}

export default Navigation;