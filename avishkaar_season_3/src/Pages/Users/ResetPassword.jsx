import React, { useState } from "react";
import { Link,useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [debug, setDebug] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = useParams().token; // Get the token from the URL

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setDebug("");
    setSuccess("");
    setIsLoading(true);

    if (!password || !confirmPassword) {
      setDebug("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setDebug("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Assuming you already have token from URL or state:
    await axios.post(
        `http://localhost:5000/api/teams/reset-password/${token}`,
        { newPassword: password } // send the new password in the body
);


      const data = res.data;
      setSuccess(data.message || "Password reset successfully! You can now sign in.");
      setDebug("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setDebug(
        error.response?.data?.message ||
          "Failed to reset password. The link may be invalid or expired."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-100 font-sans">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-transparent border border-cyan-700/50 rounded-2xl shadow-2xl p-8 glow-effect">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 animate-gradient-text">
            Reset Password
          </h1>
          <p className="text-center text-purple-200 text-sm sm:text-base mb-6">
            Enter your new password below.
          </p>
          {debug && <p className="text-center text-red-400 text-sm mb-4">{debug}</p>}
          {success && <p className="text-center text-green-400 text-sm mb-4">{success}</p>}
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="relative">
              <label htmlFor="password" className="text-left block text-sm font-medium text-gray-300">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-purple-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12"
                required
                aria-required="true"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{ background: "transparent" }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-cyan-100 focus:outline-none mt-6"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-controls="password"
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div>
              <label htmlFor="confirm-password" className="text-left block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-purple-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
                aria-required="true"
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg py-3 px-6 hover:from-cyan-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-300 mt-6">
            Back to{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-300 hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        .glow-effect {
          box-shadow: 0 0 15px rgba(0, 206, 209, 0.3), 0 0 30px rgba(147, 197, 253, 0.2);
        }

        @keyframes gradientFlow {
          0% { background: linear-gradient(to right, #00CED1, #BF00FF); -webkit-background-clip: text; background-clip: text; color: transparent; }
          50% { background: linear-gradient(to right, #BF00FF, #00CED1); -webkit-background-clip: text; background-clip: text; color: transparent; }
          100% { background: linear-gradient(to right, #00CED1, #BF00FF); -webkit-background-clip: text; background-clip: text; color: transparent; }
        }
        .animate-gradient-text {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientFlow 5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .animate-gradient-text {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;