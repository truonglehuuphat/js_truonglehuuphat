
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserProvider } from "./context/UserProvider.tsx";
import { DoctorProvider } from "./context/DoctorProvider.tsx";
import { DepartProvider } from "./context/DepartmentProvider.tsx";
// import { DatePicker } from '@mui/x-date-pickers';


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const Providers = () => {
  return (
    <DepartProvider>
      <DoctorProvider>
        <UserProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </UserProvider>
      </DoctorProvider>
    </DepartProvider>
  );
}

ReactDOM.createRoot(rootElement).render(
  <Providers />
);
