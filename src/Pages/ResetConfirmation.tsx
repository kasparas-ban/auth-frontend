import { Link, useLocation } from "react-router-dom";

function ResetConfirmation() {
  const { state } = useLocation();

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-4">
        <div className="text-gray-600 text-center mb-3">
          A password reset link was sent to the email addess
        </div>
        <div className="font-bold text-xl text-center text-gray-600 mb-3">
          {state as string}
        </div>
        <div className="text-center text-gray-600 mb-3">
          Check the email for further instructions.
        </div>
        <div className="text-center">
          <Link to="/login" className="font-bold text-gray-500 hover:text-gray-600">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetConfirmation;