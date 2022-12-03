import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react';

import {Home} from './Home';
import {Category} from './Category';
import {SportProgram} from './SportProgram';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className = "m-3 d-flex justify-content-center">React JS</h3>
      <Navigation/>
        <Routes>
          <Route path ='/' element={<Home/>} exact/>
          <Route path ='/category' element={<Category/>}/>
          <Route path ='/sportprogram' element={<SportProgram/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
