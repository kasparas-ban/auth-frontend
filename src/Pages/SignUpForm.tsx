import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { ReactComponent as LeftArrow } from '../Assets/arrow-left-solid.svg';
import { Link } from "react-router-dom";
import './SignUpForm.scss';
import { motion } from "framer-motion";

type FormInputs = {
  username: string,
  email: string,
  pass: string,
  pass2: string,
};

function SignUpForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = data => {
    // axios({
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/json; charset=utf-8' },
    //   url: 'http://localhost:3001/api/register',
    //   data: {
    //     name: data.username,
    //     email: data.email,
    //     password: data.pass,
    //     password2: data.pass2
    //   }
    // })
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));
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
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="error-text">
                  Please enter your username
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
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="error-text">
                  Please enter your email
                </p>
              )}
            </div>
          </div>
          <div className="form-input">
            <div className={`input-field ${errors.pass ? 'input-error' : ''}`}>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("pass", { required: true })}
              />
              {errors.pass && (
                <p className="error-text">
                  Please enter your password
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