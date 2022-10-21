import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { ReactComponent as LeftArrow } from '../../Assets/arrow-left-solid.svg';
import { ReactComponent as VisibilityIcon } from '../../Assets/eye-regular.svg';

import './SignUpForm.scss';

type FormInputs = {
  username: string,
  email: string,
  pass: string,
  pass2: string,
};

function SignUpForm() {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = data => {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      url: 'http://localhost:3001/api/register',
      data: {
        username: data.username,
        email: data.email,
        password: data.pass,
        password2: data.pass2
      }
    })
      .then(response => response.status === 200 ? navigate('/?activate=true') : navigate('/?signupError=true'))
      .catch(err => navigate('/?signupError=true'));
  };

  const usernameErrorMsg = (type: string) => {
    switch (type) {
      case 'required':
        return 'Username is required';
      case 'minLength':
        return 'Username is too short';
      case 'maxLength':
        return 'Username is too long';
      case 'pattern':
        return 'Only letter characters are allowed';
      default:
        return '';
    }
  };

  const emailErrorMsg = (type: string) => {
    switch (type) {
      case 'required':
        return 'Email is required';
      case 'maxLength':
        return 'Email is too long';
      default:
        return '';
    }
  };

  const passwordErrorMsg = (type: string) => {
    switch (type) {
      case 'required':
        return 'Password is required';
      case 'minLength':
        return 'Password is too short';
      case 'maxLength':
        return 'Password is too long';
      case 'pattern':
        return 'Password must contain at least one lowercase letter, uppercase letter, a digit, and a special character: @$!%*#?&^_-';
      default:
        return '';
    }
  };

  return (
    <motion.div
      key="signup-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ ease: "easeOut", duration: 0.15 }}
    >
      <div className="signup-main">
        <div className="signup-text">Sign Up</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="signup-form"
        >
          <div className="form-input">
            <div className={`input-field ${errors.username ? 'input-error' : ''}`}>
              <input
                id="username"
                type="text"
                placeholder="Username"
                {...register(
                  "username",
                  {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^[\p{L}-]+$/ug // Need to allow any unicode character
                  })
                }
              />
              {errors.username && (
                <p className="error-text">
                  {usernameErrorMsg(errors.username.type)}
                </p>
              )}
            </div>
          </div>
          <div className="form-input">
            <div className={`input-field ${errors.email ? 'input-error' : ''}`}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register(
                  "email",
                  {
                    required: true,
                    maxLength: 40
                  }
                )}
              />
              {errors.email && (
                <p className="error-text">
                  {emailErrorMsg(errors.email.type)}
                </p>
              )}
            </div>
          </div>
          <div className="form-input">
            <div className={`input-field ${errors.pass ? 'input-error' : ''}`}>
              <input
                id="password"
                type={isPassVisible ? 'text' : 'password'}
                placeholder='Password'
                {...register(
                  "pass",
                  {
                    required: true,
                    minLength: 10,
                    maxLength: 30,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]*$/ // Allowed special chars: @$!%*#?&^_- 
                  }
                )}
              />
              <VisibilityIcon className={`visibility-icon ${isPassVisible ? 'pass-visible' : ''}`} onClick={() => setIsPassVisible(!isPassVisible)} />
              {errors.pass && (
                <p className="error-text">
                  {passwordErrorMsg(errors.pass?.type)}
                </p>
              )}
            </div>
          </div>
          <div className="form-input">
            <div className={`input-field ${errors.pass2 ? 'input-error' : ''}`}>
              <input
                id="password2"
                type="password"
                placeholder="Repeat password"
                {...register(
                  "pass2",
                  {
                    required: true,
                    validate: value => value === watch('pass')
                  })
                }
              />
              {errors.pass2 && (
                <p className="error-text">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="submit-button signup-button"
          >
            Sign Up
          </button>
        </form>
        <div className="back-link">
          <Link to="/" className="back-link-text">
            <span><LeftArrow className="left-arrow" /></span>
            Back to login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUpForm;