import axios from "axios";

const service = axios.create({
  baseURL: "https://example.com/api",
});

export default service;
