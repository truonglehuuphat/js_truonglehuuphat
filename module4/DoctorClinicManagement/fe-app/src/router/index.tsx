import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "doctors",
                element: <DoctorsPage />,
            },
            {
                path: "doctors:/id",
                element: <DoctorDetailPage />,
            },
            {
                path: "doctors:/appointments",
                element: <DoctorAppointmentsPage />,
            },
            {
                path: "doctors:/schedule",
                element: <DoctorSchedulePage />,
            },
            {
                path: "patient",
                element: <PatientPage />,
            },
            {
                path: "patient/booking",
                element: <PatientBookingPage />,
            },
            {
                path: "patient/appointments",
                element: <PatientAppointmentsPage />,
            },
            {
                path: "admin",
                element: <AdminPage />,
            },
            {
                path: "admin/doctors",
                element: <AdminDoctorPage />,
            },
            {
                path: "admin/departments",
                element: <AdminDepartmentPage />,
            },
            {
                path: "admin/appointments",
                element: <AdminAppointmentPage />,
            },            
        ]
    }
]);

export default router;