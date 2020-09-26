import axios from "axios";

// 创建一个新的axios实例
const request = axios.create({
  baseURL: "",
  timeout: 20000,
});

export default request;
