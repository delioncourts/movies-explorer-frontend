import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './App.css';

//компоненты 
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import shortsFilter from '../../utils/ShortsFilter';

import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//хук
import useCurrentWidth from '../../hooks/useCurrentWidth';
//import { getInitialCount, getLoadCount } from '../../utils/getLoad'

//константы
import {
  SCREEN_SIZE_MOBILE,
  INITIAL_MOVIES_MOBILE,
  LOAD_MORE_TABLET_MOBILE,
  SCREEN_SIZE_TABLET,
  INITIAL_MOVIES_TABLET,
  SCREEN_SIZE_DESTOP,
  INITIAL_MOVIES_DESTOP,
  LOAD_MORE_DESKTOP
} from '../../utils/constants'

//Api
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function App() {
  //все фильмы - по умолчанию пустой массив
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [firstMovies, setFirstMovies] = useState(0)
  const [moreMovies, setMoreMovies] = useState(0)

  //фильмы из api, сохраненные
  const [savedMovies, setSavedMovies] = useState([]);

  //логин/регистрация
  const [loggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [errMessage, setErrMessage] = useState('');
  //поиск
  const [searchStatus, setSearchStatus] = useState('');
  const [isSearchDone, setIsSearchDone] = useState(false);

  //ошибки логина и регистрации
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  //чекбокс
  const [request, setRequest] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  //загрузка карточек
  const [loading, setLoading] = useState(false);
  const [moreLoadingButton, setMoreLoadingButton] = useState(false);

  //profile
  const [profileMessage, setProfileMessage] = useState('');

  //загрузка карточек 
  const width = useCurrentWidth();

  //const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialCount(width));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn])

  useEffect(() => {
    if (localStorage.getItem('moviesStorage')) {
      const initialSearch = JSON.parse(localStorage.getItem('moviesStorage'));
      const searchResult = shortsFilter(initialSearch, request, checkboxStatus);

      setFilteredMovies(searchResult);
      setIsSearchDone(true);
    }
  }, [currentUser])

  //сохраненные фильмы
  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
        .then((res) => {
          setSavedMovies(res.filter((m) => m.owner === currentUser._id));
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])


  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setCurrentUser(res)
            navigate(location)
          }
        })
        .catch((err) => console.log(err))
    }
  }
  //регистрация
  function handleRegister(user) {
    mainApi.register(user)
      .then(() => {
        handleLogin({
          email: user.email,
          password: user.password
        });
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setRegisterError('Пользователь с таким email уже существует');
        }
        if (err === 'Ошибка: 500') {
          setRegisterError('Ошибка сервера');
        }
        else {
          setRegisterError('При регистрации пользователя произошла ошибка');
        }
      });
  }

  //логин
  function handleLogin(user) {
    return mainApi
      .authorize(user)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setLoginError('Неправильный логин или пароль');
        }
        if (err === 'Ошибка: 500') {
          setLoginError('Ошибка сервера');
        }
        else {
          setLoginError('При авторизации пользователя произошла ошибка');
        }
      })
  }

  //  изменить данные профияля
  function handleUpdateUser(user) {
    const token = localStorage.getItem('jwt');
    mainApi
      .editProfile(user, token)
      .then((updateUser) => {
        setLoggedIn(true);
        setCurrentUser(updateUser);
        localStorage.setItem('name', updateUser.name);
        localStorage.setItem('email', updateUser.email);
        setProfileMessage('Профиль успешно обновлен!');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setProfileMessage('Пользователь с таким email уже существует');
        } else {
          setProfileMessage('При обновлении профиля произошла ошибка');
        }
      })
  }

  const handleLogout = () => {
    localStorage.clear();
    /*localStorage.removeItem('jwt');
    localStorage.removeItem('request');
    localStorage.removeItem('checkboxStatus');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('moviesStorage');
    localStorage.removeItem('name');
    localStorage.removeItem('email');

    setCurrentUser({});
    setLoggedIn(false);
    setSavedMovies([]);
    setFilteredMovies([]);
    setInitialMovies([]);
    setRequest('');
    setCheckboxStatus(false);*/

    navigate('/');
    console.log(localStorage, 'localstorage')
  };

  // сохранение и получение данных фильмов из localStorage

  function startLoading() {
    setLoading(true);
    setTimeout(() => setLoading(false), 700);
  }

  //поиск фильмов
  function handleSearchMovie(request, checkboxStatus) {
    startLoading();
    setRenderedMovies([]);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);

    const initialMoviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

    if (!initialMoviesInLocalStorage) {
      setLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setInitialMovies(movies);
          localStorage.setItem('initialMovies', JSON.stringify(movies));
        })
        .catch(() => {
          setSearchStatus('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        })
        .finally(() => {
          setLoading(false);
        })
    } else {
      setInitialMovies(initialMoviesInLocalStorage);
    }
  }

  useEffect(() => {
    if (initialMovies.length > 0) {
      const moviesStorage = shortsFilter(initialMovies, request, checkboxStatus);

      localStorage.setItem('moviesStorage', JSON.stringify(moviesStorage));
      localStorage.setItem('request', request);
      localStorage.setItem('checkboxStatus', checkboxStatus);

      setFilteredMovies(moviesStorage);
      setIsSearchDone(true);
    }
  }, [initialMovies, request, checkboxStatus]);

  //отображение карточек
  useEffect(() => {
    if (renderedMovies.length === filteredMovies.length) {
      setMoreLoadingButton(false);
    }
  }, [renderedMovies, filteredMovies]);

  //сохранить фильм
  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies((movies) => [newMovie, ...movies]);
      })
      .catch((err) => console.log(err))
  }

  //удалить фильм из библиотеки
  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((m) => m._id !== movie._id));
      })
      .catch((err) => console.log(err))
  }

  //показать карточки, если остались еще в хранилище
  useEffect(() => {
    if (width <= SCREEN_SIZE_MOBILE) {
      setFirstMovies(INITIAL_MOVIES_MOBILE)
      setMoreMovies(LOAD_MORE_TABLET_MOBILE)
    } else if (width <= SCREEN_SIZE_TABLET) {
      setFirstMovies(INITIAL_MOVIES_TABLET)
      setMoreMovies(LOAD_MORE_TABLET_MOBILE)
    } else if (width > SCREEN_SIZE_DESTOP) {
      setFirstMovies(INITIAL_MOVIES_DESTOP)
      setMoreMovies(LOAD_MORE_DESKTOP)
    }
  }, [width])

  useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > firstMovies) {
        setRenderedMovies(filteredMovies.slice(0, firstMovies));
        setMoreLoadingButton(true);
      } else {
        setRenderedMovies(filteredMovies);
      }
    }
  }, [filteredMovies, firstMovies]);

  function renderMovies() {
    setRenderedMovies((previousCount) => filteredMovies.slice(0, previousCount.length + moreMovies));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">

        <Routes>

          <Route path={'/'} element={
            <>
              <Header
                loggedIn={loggedIn}
              />
              <Main />
              <Footer />
            </>}>
          </Route>


          <Route exact path='/signup' element={
             <>
               <Register
                 onRegister={handleRegister}
                 registerError={registerError} />
             </>
           } />

 <Route exact path='/signin' element={
             <>
               <Login onLogin={handleLogin}
                 loginError={loginError} />
             </>
           } />

          <Route path={'/movies'} element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header
                  loggedIn={loggedIn} />
                <Movies
                  loggedIn={loggedIn}
                  onSearch={handleSearchMovie}
                  loading={loading}
                  isSearchDone={isSearchDone}
                  searchStatus={searchStatus}
                  renderedMovies={renderedMovies}
                  savedMovies={savedMovies}
                  onSaveMovie={handleSaveMovie}
                  onDeleteMovie={handleDeleteMovie}
                  moreLoadingButton={moreLoadingButton}
                  onRenderMovies={renderMovies}
                />
                <Footer />
              </>
            </ProtectedRoute>}>
          </Route>

          <Route path={'/saved-movies'} element={
            <ProtectedRoute loggedIn={loggedIn} >
              <>
                <Header
                  loggedIn={loggedIn} />
                <SavedMovies
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  onDeleteMovie={handleDeleteMovie}
                />
                <Footer />
              </>
            </ProtectedRoute>}>
          </Route>

          <Route path={'/profile'} element={
            <ProtectedRoute
              loggedIn={loggedIn}>
              <>
                <Header
                  loggedIn={loggedIn} />
                <Profile
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  profileMessage={profileMessage}
                  onSignOut={handleLogout}
                />
              </>
            </ProtectedRoute>}>
          </Route>

          <Route path={'*'} element={
            <>
              < PageNotFound />
            </>}>
          </Route>

        </Routes>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
