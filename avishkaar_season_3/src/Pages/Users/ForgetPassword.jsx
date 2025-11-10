import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [debug, setDebug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setDebug("");
    setSuccess("");
    setIsLoading(true);

    if (!email) {
      setDebug("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/teams/forgot-password",
        { email }
      );

      const data = res.data;
      setSuccess(data.message || "Password reset link sent to your email.");
      setEmail("");
    } catch (error) {
      setDebug(
        error.response?.data?.message ||
          "Failed to send reset link. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-100 font-sans">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-transparent border border-cyan-700/50 rounded-2xl shadow-2xl p-8 glow-effect">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 animate-gradient-text">
            Reset Password
          </h1>
          <p className="text-center text-purple-200 text-sm sm:text-base mb-6">
            Enter your email to receive a password reset link.
          </p>
          {debug && <p className="text-center text-red-400 text-sm mb-4">{debug}</p>}
          {success && <p className="text-center text-green-400 text-sm mb-4">{success}</p>}
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-left block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-purple-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
                aria-required="true"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg py-3 px-6 hover:from-cyan-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;