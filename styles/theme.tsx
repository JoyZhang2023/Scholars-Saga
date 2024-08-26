'use client';
import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

// Define ThemeContext here
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

// Create a ThemeContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Created a hook for the ThemeContext
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

// Retrieves the theme from the backend database
const fetchThemeSettings = async () => {
    try {
        const response = await axios.get('/api/theme');
        return response.data;
    } catch (error) {
        console.error('Error fetching theme settings', error);
        return null;
    }
};

// Saves the inputted theme into the backend
const saveThemeSettings = async (themeSettings: any) => {
    try {
        await axios.post('/api/theme', themeSettings);
    } catch (error) {
        console.error('Error saving theme settings', error);
    }
};

// ThemeProvider component, what will be used to actually modify the theme
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [primaryColor, setPrimaryColor] = useState<string>('#6c6c40');
    const [secondaryColor, setSecondaryColor] = useState<string>('#5e2138');
    const [textPrimary, setTextPrimary] = useState<string>('#000000');
    const [textSecondary, setTextSecondary] = useState<string>('#757575');
    const [backgroundDefault, setBackgroundDefault] = useState<string>('#f4f6f8');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            const theme = await fetchThemeSettings();
            if (theme) {
                setPrimaryColor(theme.primary_color || '#6c6c40');
                setSecondaryColor(theme.secondary_color || '#5e2138');
                setTextPrimary(theme.text_primary || '#000000');
                setTextSecondary(theme.text_secondary || '#757575');
                setBackgroundDefault(theme.background_default || '#f4f6f8');
            }
            setIsLoaded(true);
        };
        loadTheme();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            saveThemeSettings({
                primary_color: primaryColor,
                secondary_color: secondaryColor,
                text_primary: textPrimary,
                text_secondary: textSecondary,
                background_default: backgroundDefault
            });
        }
    }, [primaryColor, secondaryColor, textPrimary, textSecondary, backgroundDefault, isLoaded]);

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

    if (!isLoaded) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

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