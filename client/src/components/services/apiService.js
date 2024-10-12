import axios from "axios";
import { HOST } from "./constants.js";

export const apiService = axios.create({
    baseURL: HOST
})