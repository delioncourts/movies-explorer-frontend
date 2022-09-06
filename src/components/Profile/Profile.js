import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from '../../hooks/useFormWithValidation';

import './Profile.css'

function Profile({ onUpdateUser, onSignOut, profileMessage }) {
    const { values, setValues, errors, setErrors, handleChange, isValid, setIsValid } = useFormWithValidation();

    const [profileMessageText, setProfileMessageText] = useState('');
    const location = useLocation();

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    //изменение имени
    const handleChangeName = (evt) => {
        if (evt.target.value === currentUser.name || evt.target.value === currentUser.email) {
            setIsValid(false);
            setErrors({
                errors: errors.name,
                [evt.target.name]: 'Имя должно отличаться от установленного'
            })
        } else {
            handleChange(evt);
        }
    };

    //изменение почты
    const handleChangeEmail = (evt) => {
        if (evt.target.value === currentUser.name || evt.target.value === currentUser.email) {
            setIsValid(false);
            setErrors({
                errors: errors.name,
                [evt.target.name]: 'Email должен отличаться от установленного'
            });
        } else {
            handleChange(evt);
        }
    };

    //сообщение об ошибке
    useEffect(() => {
        setProfileMessageText(profileMessage);
    }, [profileMessage]);

    useEffect(() => {
        setProfileMessageText('');
    }, [location]);

    useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email
        });
    }, [currentUser, setValues]);

    //сохранить
    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: values.name,
            email: values.email,
        });
    }

    useEffect(() => {
        setIsValid(false);
        setValues({
            name: currentUser.name,
            email: currentUser.email,
        });
    }, [onUpdateUser])

    return (
        <section className='profile'>
            <div className='profile__content'>
                <h2 className='profile__title'>Привет, {currentUser.name} </h2>

                <form className='profile__form' onSubmit={handleSubmit}>
                    <fieldset className='profile__fieldset'>
                        <label className='profile__fields'>
                            <p className='profile__input-name'>Имя</p>
                            <input className='profile__input'
                                type='text'
                                id='input-name'
                                name='name'
                                value={values.name || ''}
                                placeholder='Имя'
                                onChange={handleChangeName}
                                minLength="2"
                                pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                                required />
                        </label>
                        <span className='profile__error'>{errors.name || ''}</span>
                        
                        <label className='profile__fields'>
                            <p className='profile__input-edit'>E-mail</p>
                            <input className='profile__input'
                                type='email'
                                name='email'
                                id='edit-email'
                                value={values.email || ''}
                                pattern="^\S+@\S+\.\S+$"
                                placeholder='E-mail'
                                onChange={handleChangeEmail}
                                required />
                        </label>
                        <span className='profile__error'>{errors.email || ''}</span>
                        <span className="profile__error-text">{profileMessageText}</span>
                    </fieldset>

                    <div className='profile__nav'>
                    <button
                            type="submit"
                            className="profile__button profile__button_edit"
                            disabled={!isValid}
                            style={(!isValid) ? {opacity: '1', color: '#504B4A'} : null}>Редактировать</button>
                        <Link className='profile__button profile__button_signin' to='/signin' onClick={onSignOut}>Выйти из аккаунта</Link>
                    </div>

                </form>
            </div>
        </section>
    )
}
export default Profile;