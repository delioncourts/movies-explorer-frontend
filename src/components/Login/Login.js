import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
/*import Error from '../Error/Error.js';*/
import HeaderLogo from '../HeaderLogo/HeaderLogo.js';

function Login() {
    return (
        <section className='login'>
        <div className='login__container'>

            <div className='login__header'>
                <HeaderLogo />
            </div>

            <h2 className='login__welcome'>Рады видеть!</h2>

            <form className="login__form" name="login-form">

                <div className="login__field">
                    <label>
                        <span className="login__email">E-mail</span>
                        <input className="login__input" type="email" name="email" placeholder="E-mail" required />
                    </label>

                    <label>
                        <span className="login__password">Пароль</span>
                        <input className="login__input" type="password" name="password" placeholder="Пароль" minLength="4" required />
                        <Error />
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