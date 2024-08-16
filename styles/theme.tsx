'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme( {
    palette: {
        mode: 'light',
        primary: {
            main: '#6c6c40',
        },
        secondary: {
            main: '#5e2138',
        },
        background: {
            default: '#4A582B',
            paper: '#778D66',
        },
        text: {
            primary: '#fcfce1',
        },
    },
});

export default theme;
