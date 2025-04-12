import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://instagram-mern-app-be.onrender.com', // replace with your Render backend URL
  withCredentials: false,           // can be true if you use cookies
});

export default instance;
