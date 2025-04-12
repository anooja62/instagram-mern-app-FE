import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useSearchParams } from 'react-router-dom';

const DashboardScreen = () => {
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState(null);
  const [media, setMedia] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [newCommentsMap, setNewCommentsMap] = useState({});
  const [profileError, setProfileError] = useState(null);
  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('https://graph.instagram.com/me', {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: accessToken,
        },
      });
      setProfile(res.data);
      fetchMedia(res.data.id);
    } catch (err) {
      setProfileError('Failed to load profile details.',err);
    }
  };

  const fetchMedia = async (userId) => {
    try {
      const res = await axios.get(`https://graph.instagram.com/${userId}/media`, {
        params: {
          fields: 'id,media_type,media_url,caption,timestamp',
          access_token: accessToken,
        },
      });
      setMedia(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async (mediaId) => {
    try {
      const res = await axios.get(`https://graph.instagram.com/${mediaId}/comments`, {
        params: {
          access_token: accessToken,
        },
      });
      setCommentsMap(prev => ({ ...prev, [mediaId]: res.data.data }));
    } catch (err) {
      console.error(err);
    }
  };

  const postComment = async (mediaId) => {
    const message = newCommentsMap[mediaId];
    if (!message) return;

    try {
      await axios.post(`https://graph.instagram.com/${mediaId}/comments`, null, {
        params: {
          access_token: accessToken,
          message,
        },
      });
      fetchComments(mediaId); // Reload comments after posting
      setNewCommentsMap(prev => ({ ...prev, [mediaId]: "" }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Instagram Profile</h2>
      {profileError && <p>{profileError}</p>}
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

      <h3 className="text-xl font-semibold mt-6">Media Feed</h3>
      {media.length > 0 ? (
        media.map((mediaItem) => (
          <div key={mediaItem.id} className="media-item mt-4 bg-white p-4 rounded shadow">
            {mediaItem.media_type === 'IMAGE' && (
              <img src={mediaItem.media_url} alt={mediaItem.caption} className="w-full h-auto rounded" />
            )}
            <p className="mt-2">{mediaItem.caption}</p>
            <p className="text-sm text-gray-500">{mediaItem.timestamp}</p>

            <button
              onClick={() => fetchComments(mediaItem.id)}
              className="text-blue-500 mt-2"
            >
              Load Comments
            </button>

            {/* Comments Section */}
            <div className="mt-4 space-y-2">
              {(commentsMap[mediaItem.id] || []).map((comment) => (
                <div key={comment.id} className="comment border rounded p-2 bg-gray-50">
                  <p>{comment.text}</p>
                </div>
              ))}

              <input
                type="text"
                value={newCommentsMap[mediaItem.id] || ""}
                onChange={(e) =>
                  setNewCommentsMap(prev => ({ ...prev, [mediaItem.id]: e.target.value }))
                }
                placeholder="Write a comment..."
                className="w-full p-2 border rounded mt-2"
              />
              <button
                onClick={() => postComment(mediaItem.id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Post Comment
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading media...</p>
      )}
    </div>
  );
};

export default DashboardScreen;
