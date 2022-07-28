import React from 'react';
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

function App() {
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
