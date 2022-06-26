import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type LoginFormInputs = {
  email: string,
  pass: string,
};

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const onSubmit: SubmitHandler<LoginFormInputs> = data => console.log(data);


  return (
    <div className="w-full max-w-xs mx-auto mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className={`shadow appearance-none border ${errors.email ? "border-red-500 focus:ring-red-200 " : "focus:border-blue-500 "
              }rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring`}
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              Please enter your email
            </p>
          )}
        </div>
        <div className="mb-6">
          <div className="flex justify-between">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="block text-center pb-3">
              <Link to="/reset" className="flex justify-center text-sm text-gray-400 hover:text-gray-600 text-center">
                Forgot Password?
              </Link>
            </div>
          </div>
          <input
            type="password"
            className={`shadow appearance-none border ${errors.pass ? "border-red-500 focus:ring-red-200 " : "focus:border-blue-500 "
              }rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring`}
            id="password"
            placeholder="******************"
            {...register("pass", { required: true })}
          />
          {errors.pass && (
            <p className="text-red-500 text-xs italic">
              Please enter your password
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:border-blue-500"
          >
            Sign In
          </button>
          <div className="block text-center py-3">
            <Link to="/register" className="font-bold text-blue-500 hover:text-blue-800">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
