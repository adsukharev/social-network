import axios from 'axios';
// import { PORT_MACHINE } from "babel-dotenv";

// const host = process.env.HOST;
const host = 'localhost';
export default () => {
    return axios.create({
        withCredentials: true,
        baseURL: `http://${host}:5000/api/`,
    });
}
