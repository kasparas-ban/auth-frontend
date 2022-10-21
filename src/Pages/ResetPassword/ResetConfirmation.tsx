import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from '../../Assets/arrow-left-solid.svg';
import './ResetConfirmation.scss';

function ResetConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate('/');
  }, []);

  return (state ?
    <motion.div
      key="resetC-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ ease: "easeOut", duration: 0.15 }}
    >
      <div className="resetC-page">
        <div className="resetC-panel">
          <div className="resetC-main-text">
            A password reset link was sent to
          </div>
          <div className="resetC-email">
            {state as string}
          </div>
          <div className="resetC-text">
            Follow the instructions in the email to recover your password.
          </div>
        </div>
        <div className="back-link">
          <Link to="/" className="back-link-text">
            <span><LeftArrow className="left-arrow" /></span>
            Back to login
          </Link>
        </div>
      </div>
    </motion.div>
    : <></>
  );
}

export default ResetConfirmation;