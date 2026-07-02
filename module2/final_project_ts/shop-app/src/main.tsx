import ReactDOM from "react-dom/client";
import router from './router'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RouterProvider } from 'react-router-dom';
import { ThemeContextProvider, useThemeContext } from "./theme/theme";

const Providers = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  )

}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeContextProvider>
    <Providers />
  </ThemeContextProvider>


)
