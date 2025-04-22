import APIURL from "../APIURL";
import { instance as axios } from "axios-instance";

const authenticate = async (uName: string, pWord: string) => {
  // hits the backend with the provided username and password, then updates axios with the returned token
  // returns token so the auth state slice can be updated (can't be done here bc it's a hook and hooks can only be used in funtional components)
  return axios
    .post(`${APIURL}/auth/login`, {
      email: uName || "",
      password: pWord || "",
    })
    .then((resp) => {
      console.log("authenticate response: ");
      console.log(resp);
      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer: ${resp.data.accessToken}`;
      return resp;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export default authenticate;
