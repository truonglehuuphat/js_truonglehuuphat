
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserProvider } from "./context/UserProvider.tsx";
import { DoctorProvider } from "./context/DoctorProvider.tsx";
import { DepartProvider } from "./context/DepartmentProvider.tsx";
import type { ComponentType, ReactNode } from "react";
// import { DatePicker } from '@mui/x-date-pickers';


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

type ProviderComponent = ComponentType<{ children: ReactNode }>;

export const combineProviders = (...providers: ProviderComponent[]) => {
  return ({ children }: { children: ReactNode }) => {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
  };
};

const AppProviders = combineProviders(
  DepartProvider,
  DoctorProvider,
  UserProvider,
);

const Providers = () => {
  return (
    <AppProviders>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </AppProviders>
  );
}

ReactDOM.createRoot(rootElement).render(
  <Providers />
);
