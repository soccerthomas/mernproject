import { useState } from "react";
import TierListLogo from "../images/TierListLogo.png";
import RegisterForm from "../components/RegisterForm.tsx";

function Register() {
  console.log("register test");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <header className="bg-gray-800 p-4">
        <nav
          className="mx-auto flex items-center justify-between p-2 lg:px-8 rounded-lg bg-gray-600"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="./" className="-m-1.5 p-1.5">
              <span className="sr-only">Tier Builder</span>
              <img className="h-8 w-auto" src={TierListLogo} alt="" />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a
              href="#"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Create Tier List
            </a>
            <a
              href="#"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Your Tier Lists
            </a>
            <a
              href="#"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Explore
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <a
              href="./register"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Create Account<span aria-hidden="true"></span>
            </a>
            <a
              href="./login"
              className="text-sm/6 font-semibold text-white hover:text-blue-200"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="bg-gray-600 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-white mb-8">
            Create Account
          </h1>
          <RegisterForm
            username={username}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
          <p className="mt-6 text-center text-sm text-white">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-white font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
