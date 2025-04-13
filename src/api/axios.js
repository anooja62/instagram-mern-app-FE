import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://instagram-mern-app-be.onrender.com', 
  withCredentials: false,           
});

export default instance;
