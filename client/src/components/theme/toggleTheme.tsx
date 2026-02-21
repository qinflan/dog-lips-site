import React, { useContext } from 'react'

import { ThemeContext } from './ThemeContext';

// define toggleTheme as functional component
export const ToggleTheme: React.FC = () => {
    // access theme context
    const themeContext = useContext(ThemeContext)

    // handle error incase component isn't wrapped by theme provider
    if (!themeContext) {
        throw new Error("ToggleTheme button must be wrapped by the ThemeProvider")
    }
    const { theme, toggleTheme } = themeContext

    return (
        <div className="toggle-container">
            { theme === 'dark' ? (
                <img src="/snog-dark.svg" className="w-8 cursor-pointer"onClick={toggleTheme}></img>
            ) : (
                <img src="/snog.svg" className="w-8 cursor-pointer "onClick={toggleTheme}></img>
            )}
    
        
              
        </div>
    )

}