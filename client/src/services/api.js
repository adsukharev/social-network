import axios from 'axios';
let HOST_URL = process.env.VUE_APP_HOST_URL;
// let HOST_URL = "http://192.168.99.100:5000";
// let HOST_URL = "http://localhost:5000";

export default () => {
    return axios.create({
        withCredentials: true,
        baseURL: `${HOST_URL}/api/`,
    });
}
