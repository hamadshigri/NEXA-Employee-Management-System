import axios from "axios";

const API = axios.create({
  baseURL: "https://nexa-employee-management-system-production.up.railway.app/",
});

export default API;