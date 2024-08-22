import React from 'react';
import { useThemeContext } from '../styles/theme';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const ThemeChanger: React.FC = () => {
    const {
        primaryColor, setPrimaryColor,
        secondaryColor, setSecondaryColor,
        textPrimary, setTextPrimary,
        textSecondary, setTextSecondary,
        backgroundDefault, setBackgroundDefault
    } = useThemeContext();

    const handleColorBoxClick = (inputId: string) => {
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) {
            input.click();
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, margin: 2, backgroundColor: 'beige' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Theme Customization</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Primary Color:</Typography>
                    <TextField
                        id="primary-color-input"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ visibility: 'hidden', position: 'absolute' }}
                    />
                    <Box
                        sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: primaryColor,
                            border: '1px solid #000',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleColorBoxClick('primary-color-input')}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Secondary Color:</Typography>
                    <TextField
                        id="secondary-color-input"
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ visibility: 'hidden', position: 'absolute' }}
                    />
                    <Box
                        sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: secondaryColor,
                            border: '1px solid #000',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleColorBoxClick('secondary-color-input')}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Text Primary Color:</Typography>
                    <TextField
                        id="text-primary-color-input"
                        type="color"
                        value={textPrimary}
                        onChange={(e) => setTextPrimary(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ visibility: 'hidden', position: 'absolute' }}
                    />
                    <Box
                        sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: textPrimary,
                            border: '1px solid #000',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleColorBoxClick('text-primary-color-input')}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Text Secondary Color:</Typography>
                    <TextField
                        id="text-secondary-color-input"
                        type="color"
                        value={textSecondary}
                        onChange={(e) => setTextSecondary(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ visibility: 'hidden', position: 'absolute' }}
                    />
                    <Box
                        sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: textSecondary,
                            border: '1px solid #000',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleColorBoxClick('text-secondary-color-input')}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Background Color:</Typography>
                    <TextField
                        id="background-color-input"
                        type="color"
                        value={backgroundDefault}
                        onChange={(e) => setBackgroundDefault(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ visibility: 'hidden', position: 'absolute' }}
                    />
                    <Box
                        sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: backgroundDefault,
                            border: '1px solid #000',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleColorBoxClick('background-color-input')}
                    />
                </Box>
            </Box>
        </Paper>
    );
};

export default ThemeChanger;