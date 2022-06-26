import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type ResetFormInputs = {
  email: string
};

function ResetForm() {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ResetFormInputs>();
  const onSubmit: SubmitHandler<ResetFormInputs> = data => {
    navigate("/reset-confirmation", { replace: true, state: data.email });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4"
      >
        <div className="mb-4">
          <div className="mb-2">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="email"
            >
              Enter your email
            </label>
          </div>
          <div className="">
            <input
              className={`shadow appearance-none border ${errors.email ? "border-red-500 focus:ring-red-200 " : "focus:border-blue-500 "
                }rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring`}
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                Please enter your email
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:border-blue-500 mb-2"
          >
            Send password reset link
          </button>
        </div>
        <div className="mb-2 text-center">
          <Link to="/login" className="font-bold text-gray-500 hover:text-gray-600">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ResetForm;
