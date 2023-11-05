import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.BASE_URL}`
});

export default axiosClient;