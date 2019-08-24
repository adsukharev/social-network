import axios from 'axios';
// import { PORT_MACHINE } from "babel-dotenv";

const host = process.env.HOST;
export default () => {
    return axios.create({
        baseURL: `${host}:3000/api/`
    });
}
