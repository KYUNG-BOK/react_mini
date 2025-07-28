import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useTheme } from '../context/ThemeContext';

const Layout = () => {
  const { theme } = useTheme();

  return (
    <>
      <NavBar />
      <main
        className={`p-5 min-h-screen transition-colors duration-300 ${
          theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
        }`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
