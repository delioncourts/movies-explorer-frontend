import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import './Profile.css'

function Profile({ name, email }) {
    return (
        <section className='profile'>
            <Navigation />
            <div className='profile__content'></div>
            <h2 className='profile__title'>Привет, {name}</h2>
            
            <form className='profile__form'>
                <fieldset className='profile__fieldset'>
                    <label className='profile__fields'>
                        <p className='profile__input-name'>Имя</p>
                        <input className='profile__input'
                            type='text'
                            id='input-name'
                            name='name'
                            value={name}
                            placeholder='Имя'
                            defaultValue={'Виталий'}
                            required />

                    </label>

                    <label className='profile__fields'>
                        <p className='profile__input-edit'>E-mail</p>
                        <input className='profile__input'
                            type='email'
                            name='name'
                            id='edit-name'
                            value={email}
                            defaultValue={'pochta@yandex.ru'}
                            placeholder='E-mail'
                            required />
                    </label>
                </fieldset>

                <div className='profile__nav'>
                    <button className='profile__button profile__button_edit' type='submit'>Редактировать</button>
                    <Link className='profile__button profile__button_signin' to='/signin'>Выйти из аккаунта</Link>
                </div>

            </form>
        </section>
    )
}
export default Profile;