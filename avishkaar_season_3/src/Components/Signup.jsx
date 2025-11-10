import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/signup.webp";
import diskImage from "../assets/Disk.webp";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: "",
    teamMembersCount: "",
    collegeName: "",
    stateName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { teamName, teamMembersCount, collegeName, stateName, email, password, confirmPassword } = formData;

  const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other",
  ];

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   if (isSubmitting) return;
  //   setMessage("");
  //   setError("");

  //   // Client-side validation
  //   if (!teamName || teamName.length < 2) {
  //     setError("Team name must be at least 2 characters long");
  //     return;
  //   }
  //   if (!collegeName || collegeName.length < 2) {
  //     setError("College name must be at least 2 characters long");
  //     return;
  //   }
  //   if (!stateName) {
  //     setError("Please select a state");
  //     return;
  //   }
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     setError("Invalid email format");
  //     return;
  //   }
  //   if (password.length < 6) {
  //     setError("Password must be at least 6 characters long");
  //     return;
  //   }
  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     setIsSubmitting(true);
  //     const newUser = { teamName, collegeName, stateName, email, password };
  //     const res = await axios.post("http://localhost:5002/api/teams/register", newUser,{ withCredentials: true });

  //     // Save teamId for OTP verification
  //     localStorage.setItem("teamId", res.data.teamId);
  //     localStorage.setItem("email", email);

  //     setMessage(res.data.message);

  //     // Reset form
  //     setFormData({
  //       teamName: "",
  //       collegeName: "",
  //       stateName: "",
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //     });

  //     navigate("/activation", { state: { teamId: res.data.teamId } });
  //   } catch (err) {
  //     if (err.response && err.response.data) {
  //       setError(err.response.data.message || "Registration failed");
  //     } else {
  //       setError("Registration failed. Please try again.");
  //     }
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setMessage("");
    setError("");
  
    // Client-side validation
    if (!teamName || teamName.length < 2) {
      setError("Team name must be at least 2 characters long");
      return;
    }
    if (!collegeName || collegeName.length < 2) {
      setError("College name must be at least 2 characters long");
      return;
    }
    if (!stateName) {
      setError("Please select a state");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      setIsSubmitting(true);
      const newUser = { teamName, collegeName, stateName, email, password, teamMembersCount };
  
      const response = await fetch("http://localhost:5002/api/teams/register", {
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
  
      // Save teamId for OTP verification
      localStorage.setItem("teamId", data.teamId);
      localStorage.setItem("email", email);
  
      setMessage(data.message);
  
      // Reset form
      setFormData({
        teamName: "",
        teamMembersCount: "",
        collegeName: "",
        stateName: "", 
        email: "",
        password: "",
        confirmPassword: "",
      });
  
      navigate("/activation", { state: { teamId: data.teamId } });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-between bg-slate-950 px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 max-w-4xl bg-transparent border border-cyan-700/50 rounded-2xl shadow-2xl p-8 relative z-10 glow-effect">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-cyan-400 orbitron mb-2">Sign Up</h1>
          <p className="text-center text-gray-200 text-sm mb-6">Join Avishkaar! Sign up to ignite your journey of innovation.</p>
          {error && <p className="text-center text-red-400 text-sm mb-4">{error}</p>}
          {message && <p className="text-center text-green-400 text-sm mb-4">{message}</p>}
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-300">Team Name</label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={teamName}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-slate-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                  placeholder="Enter team name"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="teamMembersCount" className="block text-sm font-medium text-gray-300">
                  Team Members Count
                </label>
                <select
                  id="teamMembersCount"
                  name="teamMembersCount"
                  value={teamMembersCount}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                  required
                >
                  <option value="" disabled>Team Count</option>
                  {[2, 3, 4].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="collegeName" className="block text-sm font-medium text-gray-300">College Name</label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={collegeName}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-slate-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                  placeholder="Enter college name"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="stateName" className="block text-sm font-medium text-gray-300">State Name</label>
                <select
                  id="stateName"
                  name="stateName"
                  value={stateName}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                  required
                  aria-required="true"
                >
                  <option value="" disabled>Select a state</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-slate-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                  placeholder="your@gmail.com"
                  required
                  aria-required="true"
                />
                
              </div>
              
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-slate-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all pr-12"
                  placeholder="Enter Your Password"
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-cyan-100 focus:outline-none bg-transparent border-none shadow-none mt-6"
                  style={{ background: "transparent" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-gray-800/80 border border-cyan-700/50 text-cyan-100 placeholder-slate-300/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all pr-12"
                  placeholder="Confirm Your Password"
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ background: "transparent" }}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-cyan-100 focus:outline-none bg-transparent border-none shadow-none mt-6"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? (
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
            </div>
            {/* <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-br orbitron from-cyan-400/50 via-black/10 to-blue-600/50 text-white font-semibold rounded-lg py-3 px-6  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black hover:bg-gradient-to-br hover:from-black hover:via-cyan-400 hover:to-purple-600 transition duration-500"
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button> */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full bg-gradient-to-br from-cyan-400/50 to-slate-600/50 text-white font-semibold rounded-lg py-3 px-6  focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black hover:bg-gradient-to-br hover:from-cyan-400 hover:to-slate-600 transition duration-500"
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>
          </form>
          <p className="text-center text-sm text-gray-300 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-400 hover:text-slate-300 hover:underline transition-all">
              Sign in
            </Link>
          </p>
        </div>
        <div className="w-full lg:w-1/2 max-w-md flex flex-col items-center">
          <img
            src={loginImage}
            alt="Sign Up Illustration"
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

        @media (max-width: 768px) {
          .animate-gradient-text {
            font-size: 1.75rem;
          }
        }


        @keyframes left-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        .animate-left-right {
          animation: left-right 2zymeout infinite;
        }
      `}</style>
    </div>
  );
};

export default SignUp;