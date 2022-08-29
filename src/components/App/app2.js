<Route exact path={'/signup'} element={
    <>
      <Register
        onRegister={handleRegister}
        registerError={registerError}
      />
    </>}>
  </Route>

/*

<Route exact path={'/signin'} element={
    <>
      <Login
        onLogin={handleLogin}
        loginError={loginError}
      />
    </>}>
  </Route>
*/

/*
<button className="profile__button profile__button_edit" >Редактировать</button> :
<button type="submit" disabled={!isValid} className={`profile__button profile__button_edit
    ${isValid ? '' : 'profile__button_edit-disabled'}`}>Сохранить</button>}
<Link className='profile__button profile__button_signin' to='/signin' onClick={onSignOut}>Выйти из аккаунта</Link>
*/