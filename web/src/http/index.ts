import axios from "axios";
import { API_ENDPOINT } from "../constants";

export const httpClient = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
});
