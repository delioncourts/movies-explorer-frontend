import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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

  //профиль и логин/регистрация
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [profileMessage, setProfileMessage] = useState('');
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

  const navigate = useNavigate();
  const path = useLocation().pathname;
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn])

  // сохранение и получение данных из localStorage
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


  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getContent(jwt)
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

  //логин
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    setLoginError('');
    return mainApi
      .authorize(email, password)
      .then((result) => {
        setLoginError('');
        if (result) {
          localStorage.setItem('jwt', result.token);
          userLogInSystem(email)
          navigate('/movies');
        }
        else {
          return
        }
      })
      .catch(() => {
        setIsLoading(false);
        setLoginError('Неверная почта или пароль');
      })

  }

  //регистрация
  const handleRegister = ({ email, password, name }) => {
    setIsLoading(true);
    setRegisterError('');
    return mainApi
      .register(email, password, name)
      .then((result) => {
        setRegisterError('');
        setCurrentUser(result);
        setIsLoading(false);
        setTimeout(() => handleLogin({ email, password }), 1000);
      })
      .catch(() => {
        setIsLoading(false);
        setRegisterError('Что-то пошло не так...');
      })
  }

  //выйти из аккаута
  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  const handleLogout = () => {
    setCurrentUser({});
    setUserName('');
    setUserEmail('');

    setLoggedIn(false);

    setSavedMovies([]);
    setFilteredMovies([]);
    localStorage.clear();
    setTimeout(() => {
      navigate('/');
    }, 100);
  };

  //  изменить данные профияля
  const handleUpdateUser = ({ name, email }) => {
    setProfileMessage('');
    mainApi
      .editProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setProfileMessage('Профиль успешно обновлен!');
        setIsSuccess(true);
      })
      .catch(() => {
        setIsSuccess(false);
        setProfileMessage('Что-то пошло не так...');
      });
  }

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

          <Route exact path={'/signup'} element={
            <>
              <Register
                handleRegister={handleRegister}
                registerError={registerError}
                isLoading={isLoading}
              />
            </>}>
          </Route>

          <Route exact path={'/signin'} element={
            <>
              <Login
                handleLogin={handleLogin}
                loginError={loginError}
              />
            </>}>
          </Route>

          <Route exact path={'/movies'} element={
            <ProtectedRoute
              loggedIn={loggedIn}
              isSavedMoviesPage={false}

            >
              <>
                <Movies
                  loggedIn={loggedIn}
                  deleteMovieItem={deleteMovieItem}
                  onMovieSave={handleSaveMovie}
                  onSearchMovie={handleSearchMovie}
                />
                <Footer />

              </>
            </ProtectedRoute>}>
          </Route>

          <Route exact path={'/saved-movies'} element={
            <ProtectedRoute
              loggedIn={loggedIn}
              isSavedMoviesPage={true}
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
                  isLoading={isLoading}
                  onUpdateUser={handleUpdateUser}
                  profileMessage={profileMessage}
                  isSuccess={isSuccess}
                  userEmail={userEmail}
                  loggedIn={loggedIn}
                  onLogout={handleLogout}
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
