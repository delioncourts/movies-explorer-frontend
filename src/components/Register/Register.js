import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';
import Error from '../Error/Error.js';
import HeaderLogo from '../HeaderLogo/HeaderLogo.js';

function Register() {
    return (
        <section className='register'>
            <div className='register__container'>

                <div className='register__header'>
                    <HeaderLogo />
                </div>

                <h2 className='register__welcome'>Добро пожаловать!</h2>

                <form className="register__form" name="register-form">

                    <div className="register__field">
                        <label>
                            <span className="register__name">Имя</span>
                            <input className="register__input" type="text" name="name" placeholder="Имя" minLength="2" required />
                        </label>

                        <label>
                            <span className="register__email">E-mail</span>
                            <input className="register__input" type="email" name="email" placeholder="E-mail" required />
                        </label>

                        <label>
                            <span className="register__password">Пароль</span>
                            <input className="register__input register__input_password" type="password" name="password" placeholder="Пароль" minLength="4" required />
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