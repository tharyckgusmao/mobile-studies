import React from 'react';
import {createContext, useContext, useState} from 'react';

const ThemeContext = createContext(undefined);

function ThemeProvider({children, defaulTheme}) {
  const [theme, setTheme] = useState(defaulTheme);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
export default ThemeContext;
export {ThemeProvider, useTheme};
