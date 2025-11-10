import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Activation() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [isResending, setIsResending] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get teamId from location state
  const { teamId } = location.state || {};

  // Countdown effect after successful verification
  useEffect(() => {
    if (message) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [message, navigate]);

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementsByTagName("input")[index + 1].focus();
      }
    }
  };

  // Handle resend OTP
  const handleResendOtp = async (e) => {
    e.preventDefault();
    if (isResending) return; // Prevent multiple clicks
  
    try {
      setIsResending(true);
      const teamId = localStorage.getItem("teamId");
      const email = localStorage.getItem("email");
  
      const response = await fetch("http://localhost:5002/api/teams/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId, email }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }
  
      alert("OTP resent to your email!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };
  

  // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     const otpString = otp.join("");
//     if (!otpString || otpString.length !== 6 || !/^\d{6}$/.test(otpString)) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/teams/verify", {
//         teamId,
//         otp: otpString,
//       });
//       setMessage(res.data.message);
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.message);
//       } else {
//         setError("Verification failed. Please try again.");
//       }
//     }
//   };


const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    const otpString = otp.join("");
    if (!otpString || otpString.length !== 6 || !/^\d{6}$/.test(otpString)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5002/api/teams/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include", // include cookies if needed
        body: JSON.stringify({
          teamId,
          otp: otpString,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Verification failed. Please try again.");
      }
  
      setMessage(data.message);
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    }
  };
  

  // Check if teamId is missing
  if (!teamId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-cyan-100">
        No team ID provided. Please register again.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-100 font-sans">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center w-full max-w-6xl">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-transparent border border-cyan-700/50 rounded-2xl shadow-2xl p-8 glow-effect"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-center animate-gradient-text mb-2">
              Verify Your Account
            </h1>
            <p className="text-center text-purple-200 text-sm sm:text-base mb-6">
              Enter the OTP sent to your registered email
            </p>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 rounded-lg bg-gray-800/80 border border-cyan-700/50 text-center text-2xl font-bold text-cyan-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg py-3 px-6 mt-6 hover:from-cyan-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
            >
              Verify OTP
            </button>
            <p>
              Didn't get the code?{" "}
              <a
                disabled={isResending}
                onClick={handleResendOtp}
                className={`text-cyan-400 hover:underline ${isResending ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </a>
            </p>

            {message && (
              <p className="text-center text-green-400 text-sm mt-2">
                {message} Redirecting in {countdown} seconds…
              </p>
            )}
            {error && (
              <p className="text-center text-red-400 text-sm mt-2">{error}</p>
            )}
          </form>
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
}