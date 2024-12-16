import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import loginService from "../../Services/loginService";
import { Button, Grid, TextField, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [regex] = useState({
    email: /.+@.+\..+/,
    password: /.{6,}/,
  });

  const handleChange = (value, field) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await loginService.login(data);
      toast.success("Login successful!");
      // Set authentication cookie
      Cookies.set(
        "XIOQUNVU1RPTUVSLUFVVEhFTlRJQ0FUSU9OIMSLQ1JFVC1LRVk=",
        response.token,
        { expires: 1 }
      );
      // Update authentication state in App component
      setIsAuthenticated(true); // This will trigger the redirect
      // Redirect to /receptionist after successful login
      navigate("/receptionist");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-zinc-200 shadow-lg sm:rounded-md sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <div className="text-center mb-6">
                  <img
                    src={logo}
                    alt="Hospital Logo"
                    className="mx-auto w-30 h-28"
                  />
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={data.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                  onKeyDown={handleKeyDown}
                  className="border-b-2 rounded-md border-gray-200 p-2 w-[90%] mt-10 focus:outline-none font-normal"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={data.password}
                  onChange={(e) => handleChange(e.target.value, "password")}
                  onKeyDown={handleKeyDown}
                  className="border-b-2 rounded-md border-gray-200 p-2 w-[90%] mt-5 focus:outline-none focus:border-[#1EA56C]"
                />

                <IconButton
                  onClick={handleClickShowPassword}
                  className="absolute right-12 top-4 transform -translate-y-1/2"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>

                {/* Show error message */}
                {error && <p className="text-red-500 mt-3">{error}</p>}

                <div className="flex justify-center">
                  <button
                    className={`bg-[#787878] hover:border-none text-white hover:text-white p-2 px-10 rounded-md mt-10 font-semibold shadow-md hover:shadow-slate-700 duration-300 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
