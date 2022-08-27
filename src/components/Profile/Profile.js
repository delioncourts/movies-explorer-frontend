import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from '../../hooks/useFormWithValidation';

import './Profile.css'

function Profile({ onUpdateUser, onLogout, isLoading, isSuccess }) {
    const { values, handleChange, errors, setErrors, isValid, setValues, setIsValid } = useFormWithValidation();
    const [profileButtonDisabled, setProfileButtonDisabled] = useState(true);

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    //кнопка неактивна
    function disableButton(evt) {
        evt.preventDefault();
        setProfileButtonDisabled(false);
    }

    //передача управляемых компонентов
    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: values.name,
            email: values.email,
        });
    }

    //изменение имени
    const handleChangeUsername = (evt) => {
        if (evt.target.value === currentUser.name || evt.target.value === currentUser.email) {
            setIsValid(false);
            setErrors({
                errors: errors.name,
                [evt.target.name]: 'Имя должно отличаться от текущего'
            })
        } else {
            handleChange(evt);
        }
    }

    //изменение почты
    const handleChangeEmail = (evt) => {
        if (evt.target.value === currentUser.name || evt.target.value === currentUser.email) {
            setIsValid(false);
            setErrors({
                errors: errors.name,
                [evt.target.name]: 'Email должен отличаться от текущего'
            });
        } else {
            handleChange(evt);
        }
    };

    //загрузка текущего пользователя
    useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]);

    useEffect(() => {
        if (isLoading) {
            setProfileButtonDisabled(true);
        }
    }, [isLoading]);

    useEffect(() => {
        setProfileButtonDisabled(isSuccess);
    }, [isSuccess, onUpdateUser]);

    useEffect(() => {
        if (values.name === currentUser.name && values.email === currentUser.email) {
            setIsValid(false)
        }
    }, [values]);

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
                                onChange={handleChangeUsername}
                                minLength="2"
                                pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                                required />
                        </label>
                        <span className='profile__error'>{errors.name || ''}</span>
                        <label className='profile__fields'>
                            <p className='profile__input-edit'>E-mail</p>
                            <input className='profile__input'
                                type='email'
                                name='name'
                                id='edit-name'
                                value={values.email || ''}
                                pattern="^\S+@\S+\.\S+$"
                                placeholder='E-mail'
                                onChange={handleChangeEmail}
                                required />
                        </label>
                        <span className='profile__error'>{errors.email || ''}</span>
                    </fieldset>

                    <div className='profile__nav'>

                        {profileButtonDisabled ?
                            <button className="profile__button profile__button_edit" onClick={disableButton}>Редактировать</button> :
                            <button type="submit" disabled={!isValid} className={`profile__button profile__button_edit
                                ${isValid ? '' : 'profile__button_edit-disabled'}`}>Сохранить</button>}
                        <Link className='profile__button profile__button_signin' to='/signin' onClick={onLogout}>Выйти из аккаунта</Link>
                    </div>

                </form>
            </div>
        </section>
    )
}
export default Profile;