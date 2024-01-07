import axios from "axios";


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcmJscndzd2Vyam12ZGx2aXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NTkxNTksImV4cCI6MjAxNTQzNTE1OX0.IE0L0HOwdqWUTYA4jXWOscNgcCVSSrn6-iGdW1U2T_0"
const api = axios.create({
  baseURL: "https://rfrblrwswerjmvdlvisq.supabase.co", // our API base URL
  headers: {
    "apikey": token,
    "Content-Type": "application/json",
    "prefer":"return=representation"
  },
});


api.interceptors.request.use(
  (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;