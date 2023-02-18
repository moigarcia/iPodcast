import axios, { AxiosInstance } from "axios";

const Api: AxiosInstance = axios.create({
  baseURL: `https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com')}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default Api
