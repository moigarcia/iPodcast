import axios, { AxiosInstance } from "axios";
let baseURL: string = 'https://itunes.apple.com';

const Api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 180000
});
export default Api
