'use client';
import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';

// Define the type for the theme context
interface ThemeContextType {
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    secondaryColor: string;
    setSecondaryColor: (color: string) => void;
    textPrimary: string;
    setTextPrimary: (color: string) => void;
    textSecondary: string;
    setTextSecondary: (color: string) => void;
    backgroundDefault: string;
    setBackgroundDefault: (color: string) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook for consuming the theme context
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

// ThemeProvider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [primaryColor, setPrimaryColor] = useState<string>(() => localStorage.getItem('primaryColor') || '#6c6c40');
    const [secondaryColor, setSecondaryColor] = useState<string>(() => localStorage.getItem('secondaryColor') || '#5e2138');
    const [textPrimary, setTextPrimary] = useState<string>(() => localStorage.getItem('textPrimary') || '#000000');
    const [textSecondary, setTextSecondary] = useState<string>(() => localStorage.getItem('textSecondary') || '#757575');
    const [backgroundDefault, setBackgroundDefault] = useState<string>(() => localStorage.getItem('backgroundDefault') || '#f4f6f8');

    useEffect(() => {
        localStorage.setItem('primaryColor', primaryColor);
    }, [primaryColor]);

    useEffect(() => {
        localStorage.setItem('secondaryColor', secondaryColor);
    }, [secondaryColor]);

    useEffect(() => {
        localStorage.setItem('textPrimary', textPrimary);
    }, [textPrimary]);

    useEffect(() => {
        localStorage.setItem('textSecondary', textSecondary);
    }, [textSecondary]);

    useEffect(() => {
        localStorage.setItem('backgroundDefault', backgroundDefault);
    }, [backgroundDefault]);

    // Memoize theme to prevent unnecessary recalculations
    const theme = useMemo(() => createTheme({
        palette: {
            primary: {
                main: primaryColor,
            },
            secondary: {
                main: secondaryColor,
            },
            text: {
                primary: textPrimary,
                secondary: textSecondary,
            },
            background: {
                default: backgroundDefault,
            },
        },
    }), [primaryColor, secondaryColor, textPrimary, textSecondary, backgroundDefault]);

    return (
        <ThemeContext.Provider value={{
            primaryColor, setPrimaryColor,
            secondaryColor, setSecondaryColor,
            textPrimary, setTextPrimary,
            textSecondary, setTextSecondary,
            backgroundDefault, setBackgroundDefault
        }}>
            <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};