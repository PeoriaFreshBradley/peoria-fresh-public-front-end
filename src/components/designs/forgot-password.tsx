// The Forgot Password module that comes in the signin in pages
// Contains a form that takes the email, a new password, and a comfirm password input
// On hitting the submit button, sends those inputs to the backend which rehases the new password and replaces the old hash in the database

import { useState, } from "react";
import { Alert, CircularProgress, Typography, Button } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { instance as axios } from "axios-instance";
import APIURL from "APIURL";
import { EmailTextField } from "./signin-fields";
import { PFButton } from "./custom-button";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fromProfile = location.state || false;

  const requestReset = async () => {
    setLoading(true);
    try {
      // expected status: 201
      const res = await axios.post(`${APIURL}/auth/request-password-reset`, {
        email: email,
      });
      // if there's an error set the result to -1 so we can display the error message
      setResult(res.status !== 201 ? -1 : 1);
      setLoading(false);
    } catch (err) {
      setResult(-1);
      setLoading(false);
    }
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      height="100%"
      flexDirection="column"
    >
        {loading ? (
          <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size={75} thickness={5} />
          </Box>
        ) : (
          <Stack spacing={3} alignItems="center" width={500}>
            {/** Displays when an error occurs (response code not 201) */}
            {result < 0 && (
              <Alert severity="error">
                Resetting failed! Make sure you typed in the correct email.
              </Alert>
            )}
            {/** Displays when password was sucessfully reset (status code 201) */}
            {result > 0 && (
              <Alert severity="success">
                Success! Check your email for an email titled 'Reset
                Password' from 'peoriafreshbradley@gmail.com'. It may be in your
                spam folder.
              </Alert>
            )}
            {/** Title and instructions */}
            <Typography variant="h4" fontWeight="800" color="var(--base_site_MTColorDark, #202d2b)">
              {fromProfile ? `Reset Password` : `Forgot Password`}
            </Typography>
            <Typography variant="body1" fontWeight="500" color="var(--base_site_MTColorDark, #202d2b)" textAlign={"center"}>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </Typography>
              
            {/** Email input */}
              <Box width="100%">
                <EmailTextField
                  email={email}
                  setEmail={setEmail}
                  isRegister={false}
                />
              </Box>
             {/** Submit button */}
            <PFButton fullWidth text="Submit" onClick={requestReset}/>
            
            {/** Back to login or account Button */}
            <Button
              variant="text"
              onClick= {fromProfile ? () => navigate("/garden/profile") : () => navigate("/sign-in")}
            >
              {fromProfile ? `Back to Account`: `Back to Login` }
            </Button>
            
          </Stack>
        )}
      </Box>
  );
};
