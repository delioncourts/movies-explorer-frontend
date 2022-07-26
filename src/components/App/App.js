import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

//компоненты 
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  return (
    <div className="App">
         <Routes>
         <Route exact path={'/'} element={<> 
         <Header />
         <Main />
          </>}></Route>
         </Routes>
    </div>
  );
}

export default App;
