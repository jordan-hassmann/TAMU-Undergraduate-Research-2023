import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'


// Redux
import { Provider } from 'react-redux'
import store from './store.js'

// Styles
import './index.scss'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>,
)
