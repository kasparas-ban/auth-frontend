import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './Pages/Home';
import ResetForm from './Pages/ResetForm';
import SignUpForm from './Pages/SignUpForm';
import ResetConfirmation from './Pages/ResetConfirmation';
import ErrorPage from './Pages/ErrorPage';
import NotFoundPage from './Pages/NotFoundPage';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait' initial={false}>
      <Routes key={location.pathname} location={location}>
        <Route errorElement={<ErrorPage />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/reset" element={<ResetForm />} />
          <Route path="/reset-confirmation" element={<ResetConfirmation />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes >
    </AnimatePresence>
  );
}

export default App;
