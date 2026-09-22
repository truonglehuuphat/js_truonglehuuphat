import React, { createContext, useContext, useState, type ReactNode } from "react";

interface AppointmentContextType {
    refreshTrigger: number;
    triggerRefresh: () => void;
}

const AppointmentContent = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const triggerRefresh = () => {
        setRefreshTrigger((prev) => prev + 1);
        console.log("triggerRefresh");
    }

    return (
        <AppointmentContent.Provider value={{ refreshTrigger, triggerRefresh }} >
            {children}
        </AppointmentContent.Provider>
    )
}

export const useAppointment = () => {
    const context = useContext(AppointmentContent);
    if (!context) {
        throw new Error('useAppointment phải được dùng bên trong <AppointmentContent.Provider>');
    }
    return context;
}