import axios from 'axios';
// import { PORT_MACHINE } from "babel-dotenv";

const HOST_URL = process.env.VUE_APP_HOST_URL;
export default () => {
    return axios.create({
        withCredentials: true,
        baseURL: `${HOST_URL}/api/`,
    });
}
