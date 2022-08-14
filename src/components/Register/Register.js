import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';
import Error from '../Error/Error.js';
import logo from '../../images/headerLogo.svg';

function Register() {
    return (
        <section className='register'>
            <div className='register__container'>

                <div className='register__header'>
                    <Link to="/">
                        <img className='register__logo' src={logo} alt='Логотип на с буквой s на зеленом фоне' />
                    </Link>
                </div>

                <h2 className='register__welcome'>Добро пожаловать!</h2>

                <form className="register__form" name="register-form">

                    <div className="register__field">
                        <label>
                            <span className="register__text">Имя</span>
                            <input className="register__input" type="text" name="name" placeholder="Имя" minLength="2" defaultValue={'Виталий'} required />
                        </label>

                        <label>
                            <span className="register__text">E-mail</span>
                            <input className="register__input" type="email" name="email" placeholder="E-mail" defaultValue={'pochta@yandex.ru'} required />
                        </label>

                        <label>
                            <span className="register__text">Пароль</span>
                            <input className="register__input register__input_password" type="password" name="password" placeholder="Пароль" minLength="4" defaultValue={'••••••••••••••'} required />
                            <Error />
                        </label>
                    </div>

                    <div className="register__nav">
                        <button className="register__button" type="submit">Зарегистрироваться</button>
                        <Link className="register__link" to="/signin">
                            Уже зарегистрированы?
                            <span className="register__login">Войти</span>
                        </Link>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default Register;