import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import './Home.scss';

type LoginFormInputs = {
  email: string,
  password: string,
};

function Home() {
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
          <div className="login-panel">
            <LoginForm />
          </div>
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

function LoginForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const timeoutMsg = searchParams.get('timeout');
  const userExistsMsg = searchParams.get('exists');
  const activatedMsg = searchParams.get('activated');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      url: 'http://localhost:3001/api/login',
      data
    })
      .then(res => window.location.href = "http://localhost:3001/")
      .catch(error => console.log(error));
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
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <div className="password-error-section">
          {errors.password && (
            <p className="error-text">
              Enter your password
            </p>
          )}
          <Link to="/reset" className="forgot-password-link">
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