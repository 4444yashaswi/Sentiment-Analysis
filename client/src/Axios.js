import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.145.237:8000/",
});

export default instance;