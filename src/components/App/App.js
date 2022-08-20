import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

//Api
import moviesApi from '../../utils/MoviesApi';

function App() {
  //по умолчанию пустой массив
  const [movies, setMovies] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);

  //listener 
  useEffect(() => {

    const resizeListener = () => {

    }
    // set resize listener
    window.addEventListener('resize', resizeListener);

    //clean up function after add
    return () => {
      //remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

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

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path={'/'} element={<>
            <Header />
            <Main />
            <Footer />
          </>}>
          </Route>

          <Route exact path={'/signup'} element={<>
            <Register />
          </>}>
          </Route>

          <Route exact path={'/signin'} element={<>
            <Login />
          </>}>
          </Route>

          <Route exact path={'/movies'} element={<>
            <Navigation />
            <Movies />
            <Footer />
          </>}>
          </Route>

          <Route exact path={'/saved-movies'} element={<>
            <Navigation />
            <SavedMovies />
            <Footer />
          </>}>
          </Route>

          <Route exact path={'/profile'} element={<>
            <Profile />
          </>}>
          </Route>

          <Route exact path={'*'} element={
            <>
              < PageNotFound />
            </>}>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
