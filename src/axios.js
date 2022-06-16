import axios from "axios";
import { baseApiUrl } from "./api/routes";

const apiInstance = axios.create({
  baseURL: baseApiUrl,
  withCredentials: true,
});

export default apiInstance;
