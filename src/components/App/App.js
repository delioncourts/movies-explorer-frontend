import React, { useState, useEffect } from 'react';
import { Route, Routes, useInRouterContext, useNavigate, useLocation } from 'react-router-dom';
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

//валидация
import useFormWithValidation from '../../hooks/useFormWithValidation';

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
  //const [preloader, setPreloader] = useState(false);
  //фильмы из api, сохраненные
  const [savedMovies, setSavedMovies] = useState([]);
 const [renderedMovies, setRenderedMovies] = useState([]);
 const [initialMovies, setInitialMovies] = useState([]);
 
  //ошибки логина и регистрации
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  //чекбокс
  const [request, setRequest] = useState('');
const [checkboxStatus, setCheckboxStatus] = useState(false);
  //const [checkboxInfo, setCheckboxInfo] = useState(false);

  //проверка кнопки Сохранить disabled
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  //const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  
  //валидация
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const navigate = useNavigate();
  const path = useLocation().pathname;
  const location = useLocation();


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
 //выйти из аккаута
  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  //проверка кнопки Сохранить disabled
  useEffect(() => {
    if (values.user !== useInRouterContext.userName)
      setIsButtonEnabled(true)
  }, [values])

  //лайки карточек
  const isMovieisLiked = (id) => {
    return savedMovies.includes((savedMovies) => savedMovies.movieId === id)
  }

  //удалить фильм
  function deleteMovieItem(movie) {
    setButtonDisabled(true)
   return mainApi
    .deleteMovie(movie._id)
    .then(() =>{
      setSavedMovies((state) => state.filter((c) => c._id !== movie._id)) 
    })
    .catch((err) => console.log(err))
    .finally(() => setButtonDisabled(false))
}


//Preloader 
function startPreloader() {
  setIsLoading(true);
  setTimeout(() => setIsLoading(false), 1000);
}
//ПРАВИТЬ ТУТ

 //const [checkboxStatus, setCheckboxStatus] = useState(false);
 //const [checkboxInfo, setCheckboxInfo] = useState(false);

//поиск фильмов
function handleSearchMovie(request, checkboxStatus) {
  setIsLoading();
  setRenderedMovies([]);
  setRequest(request);
  setCheckboxStatus(checkboxStatus);

  const initialMoviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

  if (!initialMoviesInLocalStorage) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((moviesData) => {
        setInitialMovies(moviesData);
        localStorage.setItem('initialMovies', JSON.stringify(moviesData));
      })
      .catch(() => {
        setSearchStatus('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
      })
      .finally(() => {
        setIsLoading(false);
      })
  } else {
    setInitialMovies(initialMoviesInLocalStorage);
  }
  
  useEffect(() => {
    if (initialMovies.length > 0) {
      const moviesStorage = moviesFilter(initialMovies, request, checkboxStatus);
      
      localStorage.setItem('moviesStorage', JSON.stringify(moviesStorage));
      localStorage.setItem('request', request);
      localStorage.setItem('checkboxStatus', checkboxStatus);

      setFilteredMovies(moviesStorage);
      setIsSearchDone(true);
    }
  }, [initialMovies, request, checkboxStatus]);
}

function renderMovies() {
  setRenderedMovies((state) => filteredMovies.slice(0, state.length + moreResults));
}

useEffect(() => {
  if (renderedMovies.length === filteredMovies.length) {
    setMoreButtonVisibility(false);
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
                  deleteMovieItem={deleteMovieItem}
                  onMovieSave={handleSaveMovie}
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
                  deleteMovieItem={deleteMovieItem}
                  />
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
     
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
