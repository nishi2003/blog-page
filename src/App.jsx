import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Create from './components/Create'
import Update from './components/Update'

function App() {
  return (
      <BrowserRouter>
      <Routes>
          <Route path = "/" element= {<Home/>}></Route>
          <Route path = "/Create" element= {<Create/>}></Route>
          <Route path = "/edit/:id" element= {<Update/>}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
