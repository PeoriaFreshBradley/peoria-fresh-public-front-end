import axios from "axios";
import APIURL from "./APIURL";

const instance = axios.create({
  baseURL: APIURL,
});

export {instance};
