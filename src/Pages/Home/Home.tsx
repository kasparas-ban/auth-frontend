import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { ReactComponent as VisibilityIcon } from '../../Assets/eye-regular.svg';
import './Home.scss';

type LoginFormInputs = {
  email: string,
  password: string,
};

function Home() {
  const [shakePanel, setShakePanel] = useState(false);
  const variants = {
    shake: { rotate: [0, 2, -2, 1, 0], transition: { ease: "easeInOut", duration: 0.2 } },
    stop: { rotate: 0 }
  }

  return (
    <motion.div
      key="login-page"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ ease: "easeOut", duration: 0.15 }}
    >
      <div className="main-content">
        <div className="center-strip">
          <div className="logo-panel">
            <CompanyLogo />
          </div>
          <motion.div
            key="login-panel"
            variants={variants}
            animate={shakePanel ? 'shake' : 'stop'}
          >
            <div className="login-panel">
              <LoginForm setShakePanel={setShakePanel} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function CompanyLogo() {
  return (
    <div className="logo">blue.dot</div>
  );
}

function LoginForm(props: { setShakePanel: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const timeoutMsg = searchParams.get('timeout');
  const userExistsMsg = searchParams.get('exists');
  const activatedMsg = searchParams.get('activated');
  const activateMsg = searchParams.get('activate');
  const signupErrorMsg = searchParams.get('signupError');
  const loginErrorMsg = searchParams.get('loginError');
  const resetMsg = searchParams.get('resetSuccess');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      url: 'http://localhost:3001/api/login',
      data
    })
      .then(res => res.status === 200 ? window.location.href = "http://localhost:3001/" : navigate('/?loginError=true'))
      .catch(err => navigate('/?loginError=true'));
    props.setShakePanel(() => true);
    setTimeout(() => {
      props.setShakePanel(() => false)
    }, 100);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="login-form"
    >
      {timeoutMsg && (
        <div className="info-message">
          <div className="info-message-text">Your link has expired</div>
          <div>Please try to register again</div>
        </div>
      )}
      {userExistsMsg && (
        <div className="info-message">
          <div className="info-message-text">A user with your email address already exists</div>
          <div>Please login or try to register with a different email address</div>
        </div>
      )}
      {activatedMsg && (
        <div className="info-message activated-text">
          <div className="info-message-text">Your account is now active!</div>
          <div>Go ahead and login</div>
        </div>
      )}
      {activateMsg && (
        <div className="info-message activated-text">
          <div className="info-message-text">Activation email sent</div>
          <div>Check your email to activate your account</div>
        </div>
      )}
      {signupErrorMsg && (
        <div className="info-message">
          <div className="info-message-text">Signup failed</div>
          <div>Please try to register again later</div>
        </div>
      )}
      {loginErrorMsg && (
        <div className="info-message">
          <div className="info-message-text">User not found</div>
          <div>Check your login details and try again</div>
        </div>
      )}
      {resetMsg && (resetMsg === 'true' ? (
        <div className="info-message activated-text">
          <div className="info-message-text">Password Reset</div>
          <div>Use your new password to login</div>
        </div>
      ) : (
        <div className="info-message">
          <div className="info-message-text">Password reset failed</div>
          <div>Try to reset your password later</div>
        </div>
      ))}
      <div className={`input-field ${errors.email ? 'input-error' : ''}`}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="error-text">
            Enter your email
          </p>
        )}
      </div>
      <div className={`input-field ${errors.password ? 'input-error' : ''}`}>
        <input
          type={isPassVisible ? 'text' : 'password'}
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <VisibilityIcon className={`visibility-icon ${isPassVisible ? 'pass-visible' : ''}`} onClick={() => setIsPassVisible(!isPassVisible)} />
        <div className="password-error-section">
          {errors.password && (
            <p className="error-text">
              Enter your password
            </p>
          )}
          <Link to="reset-request" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>
      </div>
      <button
        type="submit"
        className="submit-button"
      >
        Log in
      </button>
      <Link to="/signup" className="create-account-link">
        Create New Account
      </Link>
    </form>
  );
}

export default Home;