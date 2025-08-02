import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';

const Layout = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <NavBar />
      <main
        className={`p-5 min-h-screen ${
          theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
