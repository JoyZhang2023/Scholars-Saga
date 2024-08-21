import React from 'react';
import { useThemeContext } from '../styles/theme';

const ThemeChanger: React.FC = () => {
    const { primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor } = useThemeContext();

    return (
        <div>
            <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
            />
            <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
            />
        </div>
    );
};

export default ThemeChanger;