import { useState } from "react";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import isValidPassword from "views/gardener/gardener-helpers/is-valid-password";
import { instance as axios } from "axios-instance";
import APIURL from "APIURL";
import { PasswordTextField } from "./signin-fields";
import { PFButton } from "./custom-button";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const resetPassword = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      return "Passwords do not match!";
    }
    if (!isValidPassword(password)) {
      return "Invalid password. Password must be at least 8 characters, and contain both a number and a special character.";
    }
    try {
      // will tell the backend to update the gardener table with the new password hash
      await axios.post(`${APIURL}/auth${location.pathname}`, {
        password: password,
        confirmPassword: confirmPassword,
      });
      setLoading(false);
      setSuccess(true);
      return "Success!";
    } catch (err: any) {
      setLoading(false);
      if (err.response.status === 400)
        // requests for passwords reset expire after 2 hours
        return "Stale request. Please request a new reset email and try again.";
      return "Something went wrong...";
    }
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      height="100%"
    >
      <Box>
        {loading ? (
          <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size={75} thickness={5} />
          </Box>
        ) : (
          <Stack spacing={3} alignItems={"center"}>
            {error.length > 0 && (
              <Alert severity={success ? "success" : "error"}>{error}</Alert>
            )}
            <Typography variant="h4" fontWeight={"800"} color="var(--base_site_MTColorDark, #202d2b)">
              Reset Password
            </Typography>
            <Typography variant="body1" fontWeight={"500"} color={"var(--base_site_MTColorDark, #202d2b)"} textAlign={"center"}>
              Enter a new password below for your account.
            </Typography>
            {!success && (
              <Box>
                <PasswordTextField
                  password={password}
                  setPassword={setPassword}
                  isConfirm={false}
                />
                <PasswordTextField
                  password={confirmPassword}
                  setPassword={setConfirmPassword}
                  isConfirm={true}
                />
              </Box>
            )}
            {success ? (
              <PFButton fullWidth text="Return Home" onClick={() => navigate("/")}/>
            ) : (
              <PFButton fullWidth text="Reset Password" 
              onClick={async () => setError(await resetPassword())}/>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
};
