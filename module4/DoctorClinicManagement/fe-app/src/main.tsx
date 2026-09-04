
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers';


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const Providers = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

ReactDOM.createRoot(rootElement).render(
  <Providers />
);
