import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import logo from '../../images/headerLogo.svg';

function Login() {
    return (
        <section className='login'>
            <div className='login__container'>

                <div className='login__header'>
                    <Link to="/">
                        <img className='login__logo' src={logo} alt='Логотип на с буквой s на зеленом фоне' />
                    </Link>
                </div>

                <h2 className='login__welcome'>Рады видеть!</h2>

                <form className="login__form" name="login-form">

                    <div className="login__field">
                        <label>
                            <span className="login__text">E-mail</span>
                            <input className="login__input" type="email" name="email" placeholder="E-mail" required />
                        </label>

                        <label>
                            <span className="login__text">Пароль</span>
                            <input className="login__input" type="password" name="password" placeholder="Пароль" minLength="4" required />
                        </label>
                    </div>

                    <div className="login__nav">
                        <button className="login__button" type="submit">Войти</button>
                        <Link className="login__link" to="/signup">
                            Ещё не зарегистрированы?
                            <span className="login__register">Регистрация</span>
                        </Link>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default Login;