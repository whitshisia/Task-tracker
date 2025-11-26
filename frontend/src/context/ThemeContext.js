import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  // Apply the theme to document root
  useEffect(() => {
    const root = window.document.documentElement;

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const activeTheme = theme === "system" ? systemTheme : theme;

    // Apply class
    if (activeTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    // Save preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
