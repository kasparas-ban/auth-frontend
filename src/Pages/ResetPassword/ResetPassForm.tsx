import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { ReactComponent as LeftArrow } from '../../Assets/arrow-left-solid.svg';
import { ReactComponent as VisibilityIcon } from '../../Assets/eye-regular.svg';
import './ResetPassForm.scss';

type ResetFormInputs = {
  pass: string,
  pass2: string,
};

function ResetPassForm() {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetFormInputs>();
  const onSubmit: SubmitHandler<ResetFormInputs> = data => {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      url: 'http://localhost:3001/api/complete-reset',
      data: {
        password: data.pass,
        password2: data.pass2,
        token: params.token
      }
    })
      .then(response => response.status === 200 ? navigate('/?resetSuccess=true') : navigate('/?resetSuccess=false'))
      .catch(err => navigate('/not-found'));
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
      key="pass-reset-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ ease: "easeOut", duration: 0.15 }}
    >
      <div className="signup-main">
        <div className="signup-text">Password Reset</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="signup-form"
        >
          <div className="reset-instr">Choose a new password</div>
          <div className="form-input">
            <div className={`input-field ${errors.pass ? 'input-error' : ''}`}>
              <input
                id="password"
                type={isPassVisible ? 'text' : 'password'}
                placeholder='New password'
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
            Reset Password
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

export default ResetPassForm;