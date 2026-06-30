'use client'

import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      /* localStorage may be unavailable (private mode) — theme still toggles for the session */
    }
  }

  // Icons are driven by the `.dark` class (set pre-paint by the inline script in
  // layout.tsx), so the correct icon shows on first paint with no state and no
  // hydration flash.
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
    >
      <Sun className="hidden h-5 w-5 dark:block" />
      <Moon className="h-5 w-5 dark:hidden" />
    </button>
  )
}
