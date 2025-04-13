import React, { useEffect } from 'react';
import Insta from "../assets/Instagram_icon.png"
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();  // Using react-router's navigate hook to programmatically navigate
  const handleLogin = () => {
    window.location.href = 'https://instagram-mern-app-be.onrender.com/auth/instagram'; 
  };

  useEffect(() => {
    // Check if there are query parameters (access_token and user_id)
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const userId = params.get('user_id');

    if (accessToken && userId) {
      // If access_token and user_id exist, redirect to the dashboard
      navigate(`/dashboard?access_token=${accessToken}&user_id=${userId}`);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side: gradient + branding */}
      <div className="md:w-1/2 w-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
        <div className="text-white text-center space-y-4 px-4">
          <img
            src={Insta}
            alt="Instagram"
            className="w-24 h-24 mx-auto"
          />
          <h1 className="text-4xl font-extrabold">Instagram Connect</h1>
          <p className="text-lg font-light">Access your profile and media securely</p>
        </div>
      </div>

      {/* Right side: login card */}
      <div className="md:w-1/2 w-full bg-white flex items-center justify-center">
        <div className="w-full max-w-md text-center px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Login to Continue</h2>
          <p className="text-gray-500 mb-6">Use your Instagram account to connect</p>
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-pink-600 hover:to-purple-700 transition duration-300"
          >
            Login with Instagram
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
