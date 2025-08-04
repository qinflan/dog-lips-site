import React, { useContext } from 'react'
import { CgToggleSquareOff } from "react-icons/cg";
import { CgToggleSquare } from "react-icons/cg";

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
                <CgToggleSquare className="rounded-lg text-[var(--icon)] cursor-pointer hover:opacity-70 transition" size={31} onClick={toggleTheme} />
            ) : (
                <CgToggleSquareOff className="rounded-lg text-[var(--icon)] cursor-pointer hover:opacity-70 transition" size={31} onClick={toggleTheme} />
            )}
    
        
              
        </div>
    )

}