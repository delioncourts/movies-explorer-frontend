import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Error from '../Error/Error';

function Login({ handleLogin, loginError }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    function handleSubmit(evt) {
        evt.preventDefault();
        handleLogin(values)
    }

    //сброс фоормы
    useEffect(() => {
        resetForm('', '', false);
    }, [resetForm]);

    return (
        <section className='login'>
            <div className='login__container'>

                <div className='login__header'>
                    <HeaderLogo />
                </div>

                <h2 className='login__welcome'>Рады видеть!</h2>

                <form className="login__form" name="login-form" onSubmit={handleSubmit}>

                    <div className="login__field">
                        <label>
                            <span className="login__text">E-mail</span>
                            <input className="login__input"
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,})"
                                value={values.email || ''}
                                onChange={handleChange}
                                required />
                            <Error
                                errorMessage={errors.email}
                            />
                        </label>

                        <label>
                            <span className="login__text">Пароль</span>
                            <input className="login__input"
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={handleChange}
                                value={values.password || ''}
                                minLength="4"
                                required />
                            <Error
                                errorMessage={errors.password}
                            />
                        </label>
                    </div>

                    <div className="login__nav">
                        <Error
                            errorMessage={loginError} />
                        <button className="login__button"
                            type="submit"
                            disabled={!isValid}
                            style={!isValid ?
                                { backgroundColor: '#4285F4', opacity: '.5' } : null}
                        >Войти</button>
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