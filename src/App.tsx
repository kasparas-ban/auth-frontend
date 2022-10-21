import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './Pages/Home/Home';
import ResetReqForm from './Pages/ResetPassword/ResetReqForm';
import SignUpForm from './Pages/SignUp/SignUpForm';
import ResetConfirmation from './Pages/ResetPassword/ResetConfirmation';
import ResetPassForm from './Pages/ResetPassword/ResetPassForm';
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
          <Route path="/reset-request" element={<ResetReqForm />} />
          <Route path="/reset-confirmation" element={<ResetConfirmation />} />
          <Route path="/reset-form/:token" element={<ResetPassForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes >
    </AnimatePresence>
  );
}

export default App;
