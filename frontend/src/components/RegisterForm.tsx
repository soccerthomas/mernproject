import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";

interface RegisterFormParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
}

function RegisterForm({
  username,
  email,
  password,
  confirmPassword,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
}: RegisterFormParams) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  //new email stuff
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  // validation functions
  const validateUsername = (username: string): string => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (/\s/.test(password)) {
      return "Password cannot contain spaces";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  // validation on input change
  const handleUsernameChange = (value: string) => {
    setUsername(value);
    const error = validateUsername(value);
    setValidationErrors((prev) => ({ ...prev, username: error }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const error = validateEmail(value);
    setValidationErrors((prev) => ({ ...prev, email: error }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const error = validatePassword(value);
    setValidationErrors((prev) => ({ ...prev, password: error }));

    //re-validate confirm password if it exists
    if (confirmPassword) {
      const confirmError = validateConfirmPassword(value, confirmPassword);
      setValidationErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    const error = validateConfirmPassword(password, value);
    setValidationErrors((prev) => ({ ...prev, confirmPassword: error }));
  };

  //validate all fields before submission
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    errors.username = validateUsername(username);
    errors.email = validateEmail(email);
    errors.password = validatePassword(password);
    errors.confirmPassword = validateConfirmPassword(password, confirmPassword);

    setValidationErrors(errors);

    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requiresVerification) {
          setSuccess(data.message);
          setUserEmail(data.email);
          setShowVerifyModal(true);

          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setValidationErrors({});
        } else {
          navigate("/login");
        }
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    setShowVerifyModal(false);
    setSuccess("Email verified successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleModalClose = () => {
    setShowVerifyModal(false);
    setSuccess("Please check your email for the verification code");
  };

  //this will need to be changed to match our theme
  //there is also a minimum pwd requirement (minLength) that can be altered if needed later
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{success}</span>
          </div>
        )}

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
            onChange={(e) => handleUsernameChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Choose a username"
            required
          />
          {validationErrors.username && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.username}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
            required
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.email}
            </p>
          )}
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
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Create a password"
            required
            minLength={8}
          />
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.password}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            Password must be at least 8 characters, contain a number, and have
            no spaces
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-white mb-2"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Confirm your password"
            required
            minLength={8}
          />
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <VerifyEmail
        isOpen={showVerifyModal}
        onClose={handleModalClose}
        email={userEmail}
        onSuccess={handleVerificationSuccess}
      />
    </>
  );
}

export default RegisterForm;
