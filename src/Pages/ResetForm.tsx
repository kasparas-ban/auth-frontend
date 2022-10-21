import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from '../Assets/arrow-left-solid.svg';
import './ResetForm.scss';

type ResetFormInputs = {
  email: string
};

function ResetForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ResetFormInputs>();
  const onSubmit: SubmitHandler<ResetFormInputs> = data => {
    navigate('/reset-confirmation', { replace: true, state: data.email });
  };

  return (
    <motion.div
      key="reset-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ ease: "easeOut", duration: 0.15 }}
    >
      <div className='reset-main'>
        <div className="reset-text">Reset Password</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='reset-form'
        >
          <div className={`input-field ${errors.email ? 'input-error' : ''}`}>
            <input
              className=''
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">
                Please enter your email
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="submit-button reset-link"
            >
              Send password reset link
            </button>
          </div>
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

export default ResetForm;
