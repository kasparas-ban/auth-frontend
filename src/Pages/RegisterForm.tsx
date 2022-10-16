import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type FormInputs = {
  username: string,
  email: string,
  pass: string,
  pass2: string,
};

function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = data => {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      url: 'http://localhost:3001/api/register',
      data: {
        name: data.username,
        email: data.email,
        password: data.pass,
        password2: data.pass2
      }
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4"
      >
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="username"
            >
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className={`shadow appearance-none border ${errors.username ? "border-red-500 " : ""
                }rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500`}
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">
                Please enter your username
              </p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className={`shadow appearance-none border ${errors.email ? "border-red-500 " : ""
                }rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500`}
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
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className={`shadow appearance-none border ${errors.pass ? 'border-red-500 ' : ''}rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500`}
              id="password"
              type="password"
              placeholder="******************"
              {...register("pass", { required: true })}
            />
            {errors.pass && (
              <p className="text-red-500 text-xs italic">
                Please enter your password
              </p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="password2"
            >
              Repeat Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className={`shadow appearance-none border ${errors.pass2 ? 'border-red-500 ' : ''}rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500`}
              id="password2"
              type="password"
              placeholder="******************"
              {...register(
                "pass2",
                {
                  required: true,
                  validate: value => value === watch('pass')
                })
              }
            />
            {errors.pass2 && (
              <p className="text-red-500 text-xs italic">
                Passwords do not match
              </p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:border-blue-500"
          >
            Sign Up
          </button>
          <div className="block text-center py-3">
            <Link to="/login" className="font-bold text-blue-500 hover:text-blue-800">
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;