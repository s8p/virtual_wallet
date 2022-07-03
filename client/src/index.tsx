import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

import { Providers } from './Context'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <CssBaseline>
          <ToastContainer />
          <App />
        </CssBaseline>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
