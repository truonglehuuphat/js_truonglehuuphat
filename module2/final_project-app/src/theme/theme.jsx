import { createTheme } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {
    const [mode, setMode] = useState("light");

    const toggleTheme = () => setMode((pre) => (prev === "light" ? "dark" : "light"));

    const theme = useMemo(
    () => createTheme({
        palette: {
            mode, 
            primary: {main: '#0B74E5'},
            secondary: {main: '#FF424E'},
        },
        typography: {fontFamily: "Arial, sans-serif"},
        shape: {borderRadius: 8},
    }),[mode]);

    return (
        <ThemeContext.Provider value ={{mode, toggleTheme, theme}} >
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);