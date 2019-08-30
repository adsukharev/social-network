import axios from 'axios';

const host = process.env.HOST;
export default () => {
  return axios.create({
    withCredentials: true,
    baseURL: `http://localhost:5000/api/`
  });
}
