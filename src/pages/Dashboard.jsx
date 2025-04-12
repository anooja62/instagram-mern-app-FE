import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useSearchParams } from 'react-router-dom';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState(null);
  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`https://graph.instagram.com/me`, {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: accessToken,
        },
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Instagram Profile</h2>
      {profile ? (
        <div className="bg-white p-4 rounded shadow w-fit">
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Account Type:</strong> {profile.account_type}</p>
          <p><strong>Media Count:</strong> {profile.media_count}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Dashboard;
