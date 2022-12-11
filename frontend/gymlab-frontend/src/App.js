import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react';

import {Home} from './Home';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Categories from './Pages/Category';
import SportProgram from './Pages/SportProgram';
import Ratings from './Pages/Ratings';
import Register from './Pages/Register';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className = "m-3 d-flex justify-content-center">GymLab</h3>
      <Navigation/>
        <Routes>
          <Route path ='/home' element={<Home/>} exact/>
          <Route path ='/category' element={<Categories/>} exact/>
          <Route path ='/sportprogram' element={<SportProgram/>}/>
          <Route path ='/ratings' element={<Ratings/>}/>
          <Route path ='/register' element={<Register/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
