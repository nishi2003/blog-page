import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider} from 'react-redux'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './components/UserReducer.jsx'

const store = configureStore({
  reducer:{
    users:UserReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
