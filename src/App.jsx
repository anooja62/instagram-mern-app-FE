import React from 'react';

const App = () => {
  const handleLogin = () => {
    window.location.href = 'https://instagram-mern-app-be.onrender.com/auth/instagram';  // Replace with your deployed backend URL
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Instagram OAuth Login</h1>
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Login with Instagram
        </button>
      </div>
    </div>
  );
};

export default App;
