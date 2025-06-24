import { useState } from "react";
import TierListLogo from '../images/TierListLogo.png';

function Login() {
  console.log("login test");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // add loginform component here to process login
  };

  return (
    <>
      <header className="bg-gray-800 p-4">
        <nav className="mx-auto flex items-center justify-between p-2 lg:px-8 rounded-lg bg-gray-600" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="./" className="-m-1.5 p-1.5">
              <span className="sr-only">Tier Builder</span>
              <img className="h-8 w-auto" src={TierListLogo} alt="" />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm/6 font-semibold text-white hover:text-blue-200">Create Tier List</a>
            <a href="#" className="text-sm/6 font-semibold text-white hover:text-blue-200">Your Tier Lists</a>
            <a href="#" className="text-sm/6 font-semibold text-white hover:text-blue-200">Explore</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <a href="./register" className="text-sm/6 font-semibold text-white hover:text-blue-200">Create Account<span aria-hidden="true"></span></a>
            <a href="./login" className="text-sm/6 font-semibold text-white hover:text-blue-200">Log in <span aria-hidden="true">&rarr;</span></a>
          </div>
        </nav>
      </header>
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="bg-gray-600 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-white mb-8">
            Login
          </h1>
          <form onSubmit={loginSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enter
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-white">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:text-white font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
