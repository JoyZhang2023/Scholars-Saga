'use client';
import React, {createContext, useState, useMemo, useContext, useEffect} from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';

interface ThemeContextType {
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    secondaryColor: string;
    setSecondaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [primaryColor, setPrimaryColor] = useState<string>(() => {
        return localStorage.getItem('primaryColor') || '#6c6c40';
    });

    const [secondaryColor, setSecondaryColor] = useState<string>(() => {
        return localStorage.getItem('secondaryColor') || '#5e2138';
    });

    // LocalStorage to hold the new colors
    useEffect(() => {
        localStorage.setItem('primaryColor', primaryColor);
    }, [primaryColor]);

    useEffect(() => {
        localStorage.setItem('secondaryColor', secondaryColor);
    }, [secondaryColor]);

    const theme = useMemo(() => createTheme({
        palette: {
            primary: {
                main: primaryColor,
            },
            secondary: {
                main: secondaryColor,
            },
        },
    }), [primaryColor, secondaryColor]);

    return (
        <ThemeContext.Provider value={{ primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor }}>
            <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};