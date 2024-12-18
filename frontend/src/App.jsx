import { ErrorBoundary } from '@sentry/react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import SideMenu from './components/SideMenu';
import Home from './components/Home';
import theme from './styles/theme';
import Competitions from './components/Competitions';
import Players from './components/Players';
import Clubs from './components/Clubs';
import Login from './components/Login';
import Register from './components/Register';
import Favorites from './components/Favorites';

const App = () => {
  const isAuthenticated = useSelector((state) => !!state.session.token);

  return (
    <ErrorBoundary fallback={<h2>An error has occurred</h2>}>
      <ThemeProvider theme={theme}>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={isAuthenticated ? <Home /> : <Login />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/players" element={<Players />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />      
            </Route>
        </Routes>
        <SideMenu />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
