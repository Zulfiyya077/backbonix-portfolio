// src/hooks/useTheme.ts
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme-preference');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev: boolean) => {
      const newTheme = !prev;
      
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme-preference', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme-preference', 'light');
      }
      
      return newTheme;
    });
  };

  return { isDark, toggleTheme };
};