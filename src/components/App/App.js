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

//валидация
import useFormWithValidation from '../../hooks/useFormWithValidation';
//хук
import useCurrentWidth from '../../hooks/useCurrentWidth';
import { getInitialCount, getLoadCount } from '../../utils/getLoad'

//Api
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function App() {
  //все фильмы - по умолчанию пустой массив
  const [movies, setMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  //фильмы из api, сохраненные
  const [savedMovies, setSavedMovies] = useState([]);

  //логин/регистрация
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isSuccess, setIsSuccess] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');
  const [isSearchDone, setIsSearchDone] = useState(false);

  //ошибки логина и регистрации
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  //чекбокс
  const [request, setRequest] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  //проверка кнопки Сохранить disabled
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [moreMovies, setMoreMovies] = useState(0);
  const [moreLoading, setMoreLoading] = useState(false);

  //валидация
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  
  const width = useCurrentWidth();
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialCount(width));

  //загрузка карточек
  const handleLoadMore = () => {
      setVisibleMoviesCount((previousCount) => previousCount + getLoadCount(width))
  }

  //profile
  const [profileMessage, setProfileMessage] = useState('');

  const navigate = useNavigate();
  const path = useLocation().pathname;
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
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
          }
        })
        .catch((err) => console.log(err))
    }
  }

  //switchToLoggedIn
  const userLogInSystem = (name, email) => {
    setLoggedIn(true);
    setUserEmail(email);
    setUserName(name);
    navigate(path);
    return loggedIn;
  };

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
    mainApi.authorize(user)
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
    mainApi.editProfile(user, token)
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
    //localStorage.clear();
    localStorage.removeItem('jwt');
    localStorage.removeItem('request');
    localStorage.removeItem('checkboxStatus');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('moviesStorage');
    localStorage.removeItem('name');
    localStorage.removeItem('email');

    setCurrentUser({});
    setUserName('');
    setUserEmail('');
    setLoggedIn(false);
    setSavedMovies([]);
    setFilteredMovies([]);
    setInitialMovies([]);
    setRequest('');
    setCheckboxStatus(false);

    navigate('/');
  };

  // сохранение и получение данных фильмов из localStorage
  useEffect(() => {
    if (localStorage.getItem('moviesStorage')) {
      const initialSearch = JSON.parse(localStorage.getItem('moviesStorage'));
      const searchMovies = shortsFilter(initialSearch, request, checkboxStatus);

      setFilteredMovies(searchMovies);
      setIsSearchDone(true);
    }
  }, [currentUser])


  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((savedMovies) => {
          setSavedMovies(savedMovies.filter((m) => m.owner === currentUser._id));
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn])

  //удалить фильм
  function deleteMovieItem(movie) {
    // setButtonDisabled(true)
    return mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id))
      })
      .catch((err) => console.log(err))
    // .finally(() => setButtonDisabled(false))
  }

  //сохранить фильм
  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((addMovie) => {
        setSavedMovies((movies) => [addMovie, ...movies]);
      })
      .catch((err) => console.log(err))
  }

  //Preloader 
  function startLoading() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }

  //поиск фильмов
  function handleSearchMovie(request, checkboxStatus) {
    startLoading();
    setRenderedMovies([]);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);

    const moviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

    if (!moviesInLocalStorage) {
      setIsLoading(true);
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
          setIsLoading(false);
        })
    } else {
      setInitialMovies(moviesInLocalStorage);
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

  //cохраненные фильмы
  function handleSearchSavedMovie(request, checkboxStatus) {
    startLoading();

    const searchMovies = shortsFilter(savedMovies, request, checkboxStatus);
    setFilteredSavedMovies(searchMovies);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);
    setIsSearchDone(true);
  }

  useEffect(() => {
    if (filteredSavedMovies.length > 0) {
      const searchMovies = shortsFilter(savedMovies, request, checkboxStatus);
      setFilteredSavedMovies(searchMovies);
    }
  }, [savedMovies]);

  //загрузка еще фильмов
  function renderMovies() {
    setRenderedMovies((state) => filteredMovies.slice(0, state.length + moreMovies));
  }

  //все ли фильмы загружены
  useEffect(() => {
    if (renderedMovies.length === filteredMovies.length) {
      setMoreLoading(false);
    }
  }, [renderedMovies, filteredMovies]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">

        <Routes>

          <Route exact path={'/'} element={
            <>
              <Header
                loggedIn={loggedIn}
                accountLoggedEmail={userEmail}
              />
              <Main />
              <Footer />
            </>}>
          </Route>

          <Route path='/signup' element={!localStorage.getItem('jwt') ?
            <Register onRegister={handleRegister} registerError={registerError} /> :
            <Navigate replace to='/movies' />} />

          <Route path='/signin' element={!localStorage.getItem('jwt') ?
            <Login onLogin={handleLogin} loginError={loginError} /> :
            <Navigate replace to='/movies' />} />


          <Route exact path={'/movies'} element={
            <ProtectedRoute
              loggedIn={loggedIn}
            >
              <>
                <Movies
                  loggedIn={loggedIn}
                  deleteMovieItem={deleteMovieItem}
                  savedMovies={savedMovies}
                  onMovieSave={handleSaveMovie}
                  onSearchMovie={handleSearchMovie}
                  renderedMovies={renderedMovies}
                  onRenderMovies={renderMovies}
                  isSearchDone={isSearchDone}
                  searchStatus={searchStatus}
                  moreMovies={moreMovies}
                />
                <Footer />

              </>
            </ProtectedRoute>}>
          </Route>

          <Route exact path={'/saved-movies'} element={
            <ProtectedRoute
              loggedIn={loggedIn}
            >
              <>
                <SavedMovies
                  loggedIn={loggedIn}
                  deleteMovieItem={deleteMovieItem}
                  onSearchMovie={handleSearchSavedMovie}
                />
                <Footer />
              </>
            </ProtectedRoute>}>
          </Route>

          <Route exact path={'/profile'} element={
            <ProtectedRoute
              loggedIn={loggedIn}>
              <>
                <Profile
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  profileMessage={profileMessage}
                  onSignOut={handleLogout}
                />
              </>
            </ProtectedRoute>}>
          </Route>

          <Route exact path={'*'} element={
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
