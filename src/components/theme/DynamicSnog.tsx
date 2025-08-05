import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'


export const DynamicSnog = ({ className = "" }) => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    throw new Error("Component must be wrapped by the ThemeProvider")
  }
  const { theme } = themeContext

  const logoSrc = theme === 'dark' ? '/snog-dark.svg' : '/snog.svg'

  return (
    <div>
      <img src={logoSrc} alt="Logo" style={{ cursor: 'pointer',  }} className={className}/>
    </div>
  )

}