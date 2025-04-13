import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DashboardScreen = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('access_token');
    const userId = urlParams.get('user_id');

    if (accessToken && userId) {
      // Fetch user data or media using the accessToken
      fetchData(accessToken, userId);
    }
  }, [location]);

  const fetchData = async (accessToken, userId) => {
    try {
      const response = await fetch(`YOUR_BACKEND_URL/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {userData ? (
        <div>
          <h2>Welcome, {userData.name}</h2>
          {/* Display user-specific data here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default DashboardScreen;
