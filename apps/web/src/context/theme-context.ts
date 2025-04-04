import { createContext } from 'react'

type Theme = 'dark' | 'light' | 'system'

export interface ThemeProviderState {
  theme: Theme
  setTheme: (_theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
