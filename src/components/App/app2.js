import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useInRouterContext } from 'react-router-dom';
import './App.css';

//компоненты 
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ShortsFilter from '../../utils/ShortsFilter';


import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//хук
import useCurrentWidth from '../../hooks/useCurrentWidth';

//валидация
import useFormWithValidation from '../../hooks/useFormWithValidation';

import { getInitialCount, getLoadCount } from '../../utils/getLoad'
//Api
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function App() {
  //все фильмы - по умолчанию пустой массив
  const [movies, setMovies] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  //фильмы из api, сохраненные
  const [savedMovies, setSavedMovies] = useState([]);

  //ошибки логина и регистрации
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  //чекбокс
  const [request, setRequest] = useState('');
  //const [checkboxStatus, setCheckboxStatus] = useState(false);
  сonst [checkboxInfo, setCheckboxInfo] = useState(false);

  //проверка кнопки Сохранить disabled
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const width = useCurrentWidth();

  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialCount(width));

  const fetchMovies = () => {
    moviesApi.getMovies()
      .then((res) => {
        setMovies(res)
        localStorage.setItem('movies', JSON.stringify(res));
      })
      // добавить catch если что-то сломается
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  const tokenCheck = () => {
    
  }
  // сохранение и получение данных из localStorage
  useEffect(() => {
    const localMovies = localStorage.getItem('movies');

    if (localMovies) {
      try {
        const parsedMovies = JSON.parse(localMovies);

        //if(!Array.isArray(parsedMovies)) {
        //обработать ошибку
        //}
        setMovies(parsedMovies);
      } catch (err) {
        localStorage.removeItem('movies');
        fetchMovies();
      }
    } else {
      fetchMovies();
    }
  }, [])

  const handleLoadMore = () => {
    setVisibleMoviesCount((previousCount) => previousCount + getLoadCount(width))
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
        setTimeout(() => handleLogin({email, password}), 1000);
      })
      .catch(() => {
        setIsLoading(false);
        setRegisterError('Что-то пошло не так...');
      })
  }
  // логин 
  /*
  useEffect(() => {
    if (isLoggedIn) {
      // запросить карточки с бэка
    }
  }, [isLoggedIn])

  const logout = () => {
    // выйти из аккаунта
  }*/

  //проверка кнопки Сохранить disabled
  useEffect(() => {
    if (values.user !== useInRouterContext.userName)
      setIsButtonEnabled(true)
  }, [values])

  //лайки карточек
  const isMovieisLiked = (id) => {
    return savedMovies.includes((savedMovies) => savedMovies.movieId === id)
  }

  //валидация
  //меняем хук 
  //const {values, handleChange, setValues} = useForm();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  /* отрисовка карточек по 8 сразу
  {
movies.slice(0, visibleMoviesCount).map((movies,index) => (
<Movie isLiked={isMovieisLiked(movie.id)}
  <div key={movie.id}>{`${index +1}: ${movies.nameRU`}</div>
))
  } 
  
  скрыть еще после отрисовки всех карточек 
  {visibleMoviesCount < movies.length &&*/


  /* //error не массив, делаем по ключам
      {Object.keys(errors).map((errorKey, index) => (
        <div key={index}>{errors[errorKey]}</div>
      ))}

      <form noValidate>
        <input
          name='user'
          minLength={2}
          maxLength={10}
          value={values.user || ' '}
          onChange={handleChange} />

        <input
          name='password'
          value={values.password || " "}
          minLength={2}
          maxLength={10}
          onChange={handleChange} />
      </form>*/

  /* <Footer />
        скрыть еще после отрисовки всех карточек
        {visibleMoviesCount < movies.length &&
          (<button onClick={handleLoadMore}>load more</button>)}*/
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Router>
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
                keyword={keyword}
              >
                <>
                  <Navigation />
                  <Movies />
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
                  <Navigation />
                  <SavedMovies />
                  <Footer />
                </>
              </ProtectedRoute>}>
            </Route>

            <Route exact path={'/profile'} element={
              <ProtectedRoute
                loggedIn={loggedIn}>
                <>
                  <Profile />
                </>
              </ProtectedRoute>}>
            </Route>

            <Route exact path={'*'} element={
              <>
                < PageNotFound />
              </>}>
            </Route>

          </Routes>
        </Router>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
