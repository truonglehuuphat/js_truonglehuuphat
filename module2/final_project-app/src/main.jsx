// import { StrictMode } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {ThemeProvider, CssBaseline} from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import {router} from './router/index.jsx'
import { ThemeContextProvider, useThemeContext } from './theme/theme'



const Providers = () => {
  const { theme } = useThemeContext();
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <App /> */}
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ThemeContextProvider>
        <Providers />
      </ThemeContextProvider>
    </React.StrictMode>
)
