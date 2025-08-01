import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { ThemeContext } from './ThemeContext'


export const DynamicLogo: React.FC = () => {
  const themeContext = useContext(ThemeContext)
  const navigate = useNavigate()

  if (!themeContext) {
    throw new Error("Component must be wrapped by the ThemeProvider")
  }
  const { theme } = themeContext

  const logoSrc = theme === 'dark' ? '/text-logo-dark.svg' : '/text-logo-light.svg'

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <div className="hover:opacity-80 transition">
      <img src={logoSrc} alt="Logo" style={{ cursor: 'pointer',  }} onClick={handleLogoClick} />
    </div>
  )

}