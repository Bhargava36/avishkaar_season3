import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import loginImage from "../../assets/loginform.webp";
import diskImage from "../../assets/Disk.webp";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [debug, setDebug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check for existing token on mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        if (decoded.role === "Admin") {
          navigate("/users", { replace: true });
        } else {
          navigate("/admin", { replace: true });
        }
      } catch (error) {
        sessionStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setDebug("");
    setIsLoading(true);

    if (!email || !password) {
      setDebug("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Invalid login. Please try again.");
      }
  
      if (data.token) {
        const token = data.token;
        sessionStorage.setItem("token", token);
        
        const decoded = jwtDecode(token);
        console.log("Decoded token after login:", decoded);
        if (decoded.role === "Admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/users", { replace: true });
        }
      } else {
        setDebug(data.message || "Invalid login. Please try again.");
      }
    } catch (error) {
      setDebug(error.message || "Invalid login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-gray-100 font-sans">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-around w-full max-w-7xl gap-8 lg:gap-12">
          <div className="w-full flex flex-col items-center justify-center order-1 lg:order-0">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 max-w-[400px] sm:max-w-[500px] animate-float"
            />
            <img
              src={diskImage}
              alt="Disk Illustration"
              className="w-full h-auto object-cover rounded-2xl shadow-xl animate-left-right relative z-0
                         [filter:drop-shadow(0_0_20px_rgba(0,200,255,0.7))drop-shadow(0-110px_110px_rgba(0,200,255,1.0))]"
            />
          </div>
          <div className="w-full  bg-transparent border border-cyan-700/50 rounded-2xl shadow-2xl p-8 glow-effect order-0 lg:order-1">
            <gradient><h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
              Sign In
            </h1>
            </gradient>
            <p className="text-center text-purple-200 text-sm sm:text-base mb-6">
              Welcome to Avishkaar! Log in to spark innovation.
            </p>
            {debug && <p className="text-center text-red-400 text-sm mb-4">{debug}</p>}
            <form onSubmit={handleLogin} className="space-y-6">
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
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="text-left block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-purple-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12"
                  required
                  aria-required="true"
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
                <Link
                  to="/admforgot"
                className="absolute right-0 -bottom-6 text-xs text-purple-300 hover:text-purple-200 transition-all"
                tabIndex={0}
              >
    Forgot password?
  </Link>
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg py-3 px-6 hover:from-cyan-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "letting you in..." : "login"}
              </button>
            </form>
            <p className="text-center text-sm text-gray-300 mt-6">
              Don't have an account?{" "}
              <Link
                to="/admregistration"
                className="text-purple-400 hover:text-purple-300 hover:underline transition-all"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        .glow-effect {
          box-shadow: 0 0 15px rgba(0, 206, 209, 0.3), 0 0 30px rgba(147, 197, 253, 0.2);
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }

        @keyframes slide {
          0% { transform: translateX(-50px); }
          50% { transform: translateX(0); }
          100% { transform: translateX(-50px); }
        }
        .animate-slide {
          animation: slide 3s ease-in-out infinite;
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

        @keyframes left-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        .animate-left-right { animation: left-right 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AdminLogin;