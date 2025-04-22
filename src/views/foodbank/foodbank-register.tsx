import { useState } from "react";
import { Alert, Typography } from "@mui/material";
import { Box, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import register from "./foodbank-helpers/foodbank-register";
import { PFButton } from "components/designs/custom-button";
import {
  EmailTextField,
  PasswordTextField,
} from "components/designs/signin-fields";

export const FoodBankAdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useParams();

  console.log(token);

  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      height="100%"
      flexDirection="column"
    >
        <Stack spacing={2} alignItems={"center"} width={500}>
          {error.length > 0 && <Alert severity="error">{error}</Alert>}
          <Typography variant="h4" fontWeight="800" color="var(--base_site_MTColorDark, #202d2b)" sx={{ alignSelf: "center" }}>
            Create your account
          </Typography>
          <Typography variant="body1" fontWeight="500" color="var(--base_site_MTColorDark, #202d2b)" sx={{alignSelf:"center"}}> 
            Create an account to view and manage your organization.
          </Typography>
          <Box>
            <TextField
              sx={{backgroundColor:"white"}}
              margin="normal"
              required
              fullWidth
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <EmailTextField
              email={email}
              setEmail={setEmail}
              isRegister={true}
            />
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
            <PFButton
              fullWidth
              text="Create your account"
              onClick={() =>
                setError(
                  register(
                    name,
                    email,
                    password,
                    confirmPassword,
                    token,
                    dispatch,
                    navigate
                  ) || ""
                )
              }
            />
        </Stack>
        </Box>
  );
};
