import { useState, useEffect, useCallback } from "react";
import { Alert, CircularProgress, Typography, Button } from "@mui/material";
import { Box, Stack, Divider } from "@mui/material";
import authenticate from "../../functions/authenticate";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { setAuth } from "../../state/slices/user-slice";
import { EmailTextField, PasswordTextField } from "./signin-fields";
import  loginBackground  from "../../images/loginBackground.png"
import { PFButton } from "./custom-button";

export const SignIn = () => {
  // State variables to manage user input, error state, and loading state
  const [uName, setUName] = useState("");
  const [pWord, setPWord] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const adminSignIn = useCallback(() => {
    setLoading(true);
    authenticate(uName, pWord).then((resp) => {
      if (typeof resp.data !== "undefined") {
        // If authentication successful, dispatch action to set authentication state
        dispatch(
          setAuth({
            authToken: resp.data.accessToken,
            gardenAuthorized: resp.data.user.gardenerProfile !== null,
            foodBankAuthorized: resp.data.user.foodBankProfile !== null,
            userObj: resp.data.user
          })
        );
        setError(false);
        setLoading(false);
        localStorage.setItem('expiry', resp.data.expiry);
        if (resp.data.user.gardenerProfile) {
          if (resp.data.user.gardenerProfile.hasGarden) {navigate("/garden/dashboard");}
          else {navigate("/garden/user-landing");}
        }
        else navigate("/");
      } else {
        // If authentication fails, clear input fields, set error state, and stop loading
        setUName("");
        setPWord("");
        setError(true);
        setLoading(false);
      }
    });
  }, [uName, pWord, dispatch, navigate]);

   // Add useEffect hook here to listen for "Enter" key press
   useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        adminSignIn();
      }
    };

    // Attach event listener to the document to listen for "keypress" events
    document.addEventListener("keypress", handleKeyPress);

    // Clean up: Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [adminSignIn]); // Dependency array ensures effect only runs when adminSignIn changes

  return (
    <Box
      alignItems="center"
      display="flex"
      height="90vh"
      flexDirection="column"
    > 
      {loading ? (
        <Box height="100%" width="100%" display="flex" justifyContent= "center" alignItems="center">
          <CircularProgress size={75} thickness={5} />
        </Box>
          ) : (
            <Stack spacing={2} marginTop={4} position={"relative"} zIndex={"30"}> 
              {error && <Alert severity="error">Login failed!</Alert>}
              <Typography variant="h3" fontWeight="800" color="var(--base_site_MTColorDark, #202d2b)" sx={{ alignSelf: "center"}}>
                {`Let's Grow!`}
              </Typography>
              <Typography variant="h6" fontWeight="400" color="var(--base_site_MTColorDark, #202d2b)" sx={{ alignSelf: "center" }}>
                {`Produce a difference`}
              </Typography>
              <Box>
                <EmailTextField
                  email={uName}
                  setEmail={setUName}
                  isRegister={false}
                />
                <PasswordTextField
                  password={pWord}
                  setPassword={setPWord}
                  isConfirm={false}
                />
                <Button 
                  variant="text" 
                  onClick={() => navigate("/sign-in/forgot")}
                >
                  Forgot your password?
                </Button>
              </Box>
                  <PFButton text="Login" onClick={adminSignIn} 
                  sx={{
                    //maxWidth:"40%",
                    minWidth:"40%",
                    alignSelf:"center"
                  }}/>
                <Box>
                  <Divider>OR</Divider>
                </Box>
                  <PFButton text="Create New Account" onClick={() => navigate("/sign-in/register")}
                  sx={{
                    //maxWidth:"40%",
                    minWidth:"40%",
                    alignSelf:"center"
                  }}
                  />
            </Stack>
          )}

      {/** Conditionally render background image */}
      {!loading && (
        /** Two boxes to cointain the absolute within the relative so it doesn't impede the footer */
        <Box position={"relative"} height="100%" width="100%">
          <Box position={"absolute"} zIndex={"20"} bottom={0}
            sx={{
              backgroundImage: `url(${loginBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "40vh", 
              width: "100%",
            }}> 
          </Box>
        </Box>
      )}
    </Box>
  );
};