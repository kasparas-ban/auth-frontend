import { Link } from "react-router-dom";
import { ReactComponent as CompanyLogo } from '../Assets/CompanyLogo.svg';

function Home() {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <CompanyLogo className="h-16 mb-8" />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-2">
        <div className="text-center text-5xl mb-8">Welcome</div>
        <Link to="/login" className="block text-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:border-blue-500">
          Log in
        </Link>
        <div className="text-center py-3">
          <Link to="/register" className="font-bold text-blue-500 hover:text-blue-800">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;