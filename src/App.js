import './App.css';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import NoMatchPage from './pages/NoMatch';


function App() {
  return (
    <AuthProvider>
      <NavBar />
        <Routes>
            <Route  path='/' element={<RequireAuth><HomePage /></RequireAuth>} />
            <Route  path='login' element={<LoginPage />} />
            <Route path='*' element={<NoMatchPage />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;
