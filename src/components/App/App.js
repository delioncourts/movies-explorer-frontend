import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useInRouterContext } from 'react-router-dom';
import './App.css';

//компоненты 
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

//хук
import useCurrentWidth from '../../hooks/useCurrentWidth';

//валидация
import { useForm, useFormWithValidation } from '../../hooks/useForm';

import { getInitialCount, getLoadCount } from '../../utils/getLoad'
//Api
import moviesApi from '../../utils/MoviesApi';

function App() {
  //пвсе фильмы - по умолчанию пустой массив
  const [movies, setMovies] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  //фильмы из api, сохраненные
  const [savedMovies, setSavedMovies] = useState([]);

  const width = useCurrentWidth();

  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialCount(width));

  const fetchMovies = () => {
    moviesApi.getMovies()
      .then((res) => {
        setMovies(res)
        localStorage.setItem('movies', JSON.stringify(res));
        // добавить catch если что-то сломается
      })
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
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
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
              <Register />
            </>}>
          </Route>

          <Route exact path={'/signin'} element={
            <>
              <Login />
            </>}>
          </Route>

          <Route exact path={'/movies'} element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Navigation />
                <Movies />
                <Footer />

              </>
            </ProtectedRoute>}>
          </Route>

          <Route exact path={'/saved-movies'} element={
            <>
              <Navigation />
              <SavedMovies />
              <Footer />
            </>}>
          </Route>

          <Route exact path={'/profile'} element={
            <ProtectedRoute loggedIn={loggedIn}>
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
