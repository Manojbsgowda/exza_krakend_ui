import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
});

export const defaultPort = "8080";
export const defaultVersion = "2";
