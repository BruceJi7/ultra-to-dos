import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import Header from './components/Head/Header/Header'
import NavBar from './components/Head/NavBar/NavBar'
import Main from './components/Main/Main'
// import Footer from './components/Footer/Footer'

import './App.css'


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <NavBar/>
        <Main/>
        {/* <Footer/> */}
      </div>
    </BrowserRouter>
  )
}

export default App


