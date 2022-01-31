import Leaflet from 'leaflet'
import React, { Component } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import UserList from './UserList'
import UserCreate from './UserCreate'
import UserUpdate from './UserUpdate'
Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/'

class App extends Component {

  render() {
    return (

      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<UserList/>} />
            <Route exact path='/create' element={<UserCreate/>} />
            <Route exact path='/update/:id' element={<UserUpdate/>} />
  
          </Routes>
        </div>
      </Router>

    );
  }
}

export default App;