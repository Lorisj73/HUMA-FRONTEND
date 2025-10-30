import { useMemo } from 'react'

function SunIcon(){
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  )
}
function MoonIcon(){
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function ThemeToggle({theme, onToggle}){
  const isDark = theme === 'dark'
  const label = useMemo(()=> isDark ? 'Mode sombre' : 'Mode clair', [isDark])

  return (
    <button
      aria-label={label}
      title={label}
      onClick={onToggle}
      className="toggle"
    >
      <span className="track">
        <span className="icon sun"><SunIcon/></span>
        <span className="icon moon"><MoonIcon/></span>
        <span className="thumb" data-dark={isDark}></span>
      </span>
    </button>
  )
}
