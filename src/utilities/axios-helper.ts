import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const GET = async (url: string, config = {}) => {
  return await instance
    .get(url, { ...config })
    .then((response) => response.data);
};

const POST = async (url: string, data = {}, config = {}) => {
  return instance
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
};

const FORM_POST = async (url: string, data: any, config = {}) => {
  return instance
    .post(url, data, { ...config })
    .then((response) => response.data);
};

export { GET, POST, FORM_POST };
