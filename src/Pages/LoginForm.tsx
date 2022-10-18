import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";

type LoginFormInputs = {
  email: string,
  password: string,
};

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
    <div className="w-full max-w-xs mx-auto mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4"
      >
        {timeoutMsg && (
          <div className="text-center mb-4">
            <div className="text-red-500 font-bold text-xl">Your link has expired.</div>
            <div>Please try to register again.</div>
          </div>
        )}
        {userExistsMsg && (
          <div className="text-center mb-4">
            <div className="font-bold text-red-500 text-xl">A user with your email address already exists</div>
            <div>Please try to register with a different email address</div>
          </div>
        )}
        {activatedMsg && (
          <div className="text-center mb-4">
            <div className="font-bold text-green-500 text-xl">Your account is now active!</div>
            <div>Go ahead and login</div>
          </div>
        )}
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
            className={`shadow appearance-none border ${errors.password ? "border-red-500 focus:ring-red-200 " : "focus:border-blue-500 "
              }rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring`}
            id="password"
            placeholder="******************"
            {...register("password", { required: true })}
          />
          {errors.password && (
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
            Log in
          </button>
          <div className="block text-center py-3">
            <Link to="/register" className="font-bold text-blue-500 hover:text-blue-800">
              Create New Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
