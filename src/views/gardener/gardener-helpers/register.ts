import isValidPassword from "./is-valid-password";
import {instance as axios} from "axios-instance";
import APIURL from "../../../APIURL";
import { setAuth } from "../../../state/slices/user-slice";

//Takes input from registration page text fields
//and sends to backend if valid
const register = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  dispatch: Function,
  navigate: Function
) => {
  if (
    name.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0
  ) {
    // TODO: verify email for validity and uniqueness

    if (password !== confirmPassword) {
      return "Passwords do not match!";
    }

    if (!isValidPassword(password)) {
      return "Invalid password. Password must be at least 8 characters, and contain both a number and a special character.";
    }
    //Hits /register on backend with registration info
    axios
      .post(`${APIURL}/auth/register`, {
        profile: { name },
        type: "gardener",
        email,
        password,
        confirmPassword,
      })
      .then((resp) => {
          if (typeof resp.data !== "undefined") {
            dispatch(
              // sets current auth state
              setAuth({
                authToken: resp.data.accessToken,
                gardenAuthorized: resp.data.user.gardenerProfile !== undefined,
                foodBankAuthorized: resp.data.user.foodBankProfile !== undefined,
                userObj: resp.data.user
              })
            );
            navigate("/garden/opt-in-game"); //was "/garden/opt-in-teams"
            return "Success!";
          } else return "Authentication failed. Try again!";
      })
      .catch((err) => {
        return err;
      });
  } else return "Missing required fields!";
};

export default register;
