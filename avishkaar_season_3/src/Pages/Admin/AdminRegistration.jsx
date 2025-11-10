import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/signup.webp"; // adjust path if needed
import diskImage from "../../assets/Disk.webp"; // adjust path if needed

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    AdminName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretToken: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { AdminName, email, password, confirmPassword, secretToken } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => setShowPassword((p) => !p);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((p) => !p);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // basic client-side validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    try {
      setIsSubmitting(true);
      const newUser = { AdminName, email, password, secretToken };
  
      const response = await fetch("http://localhost:5002/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      
      setMessage(data.message);
      setFormData({
        AdminName: "",
        email: "",
        password: "",
        confirmPassword: "",
        secretToken: "",
      });
      navigate('/admlogin');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-between bg-black px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 max-w-3xl bg-transparent border border-cyan-700/50 rounded-2xl shadow-2xl p-8 relative z-10 glow-effect">
          <h1 className="text-3xl sm:text-4xl font-bold text-center animate-gradient-text mb-2">Registration</h1>
          <p className="text-center text-gray-200 text-sm mb-6">Fill in your details to register.</p>
          {error && <p className="text-center text-red-400 text-sm mb-4">{error}</p>}
          {message && <p className="text-center text-green-400 text-sm mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="AdminName" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="AdminName"
                  name="AdminName"
                  value={AdminName}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-purple-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-purple-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="your@gmail.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-purple-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12"
                  placeholder="Enter Your Password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-cyan-100 focus:outline-none bg-transparent border-none shadow-none mt-6"
                  style={{ background: "transparent" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-purple-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12"
                  placeholder="Confirm Your Password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-cyan-100 focus:outline-none bg-transparent border-none shadow-none mt-6"
                  style={{ background: "transparent" }}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Secret Token */}
              <div>
                <label htmlFor="secretToken" className="block text-sm font-medium text-gray-300">Password again</label>
                <input
                  type="text"
                  id="secretToken"
                  name="secretToken"
                  value={secretToken}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-purple-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter Password once more"
                  required
                />
              </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-br orbitron from-cyan-400/50 via-black/10 to-purple-600/50 text-white font-semibold rounded-lg py-3 px-6  focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black hover:bg-gradient-to-br hover:from-black hover:via-cyan-400 hover:to-purple-600 transition duration-500"
              >
                {isSubmitting ? "Submitting..." : "regester"}
              </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 hover:underline transition-all">
              Sign in
            </Link>
          </p>
        </div>

        <div className="w-full lg:w-1/2 max-w-md flex flex-col items-center">
          <img
            src={loginImage}
            alt="Registration Illustration"
            className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 max-w-[400px] sm:max-w-[500px] animate-float"
          />
          <img
            src={diskImage}
            alt="Disk Illustration"
            className="w-full h-auto object-cover rounded-2xl shadow-xl animate-left-right relative z-0 [filter:drop-shadow(0_0_20px_rgba(0,200,255,0.7))drop-shadow(0-110px_110px_rgba(0,200,255,1.0))]"
          />
        </div>
      </div>

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

        @keyframes left-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        .animate-left-right {
          animation: left-right 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminRegistration;