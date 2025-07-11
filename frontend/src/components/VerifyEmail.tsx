import { useState } from "react";
import { useEffect } from "react";

interface VerifyEmailParams {
  props: {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onSuccess: (data: VerifyEmailParams["apiResponse"]) => void;
  };

  apiResponse: {
    success: boolean;
    message: string;
    user?: {
      id: string;
      username: string;
      email: string;
      emailVerified: boolean;
    };
  };
}

function VerifyEmail({
  isOpen,
  onClose,
  email,
  onSuccess,
}: VerifyEmailParams["props"]) {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  useEffect(() => {
    let timer: number;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verifyCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(data);
        onClose();
      } else {
        console.error(`Registration Verification Error: ${data.message}`);
        setError("Verification Failed");
      }
    } catch (error) {
      setError("Network Error! Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (): Promise<void> => {
    setResendLoading(true);
    setError("");

    try {
      const response = await fetch("api/auth/sendCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: VerifyEmailParams["apiResponse"] = await response.json();

      if (data.success) {
        setResendCooldown(60);
        setError("");
      } else {
        console.error(data.message);
        setError("Failed to resend code");
      }
    } catch (error) {
      setError("Network Error. Please try again");
    } finally {
      setResendLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setCode(value);
      setError("");
    }
  };

  const handleClose = (): void => {
    setCode("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          disabled={loading}
          type="button"
        >
          x
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600">We've sent a 6-digit code to</p>
          <p className="font-medium text-blue-600">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleCodeChange}
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={6}
              autoComplete="off"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-3">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resendLoading || resendCooldown > 0}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
            type="button"
          >
            {resendLoading
              ? "Sending..."
              : resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend Code"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Code expires in 10 minutes</p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
