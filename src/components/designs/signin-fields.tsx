import { TextField } from "@mui/material";
import EmailDisclaimer from "./email-disclaimer";

interface PasswordProps {
  password: string;
  setPassword: Function;
  isConfirm: Boolean;
}
const PasswordTextField = ({
  password,
  setPassword,
  isConfirm,
}: PasswordProps) => (
  <TextField
    sx={{backgroundColor: "var(--base_site_MTColorLight, #fffbf8)"}}
    margin="normal"
    required
    fullWidth
    name={isConfirm ? "confpassword" : "password"}
    label={isConfirm ? "Confirm Password" : "Password"}
    value={password}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value)
    }
    type="password"
    id={isConfirm ? "confpassword" : "password"}
    autoComplete="current-password"
  />
);

interface EmailProps {
  email: String;
  setEmail: Function;
  isRegister: Boolean;
  notRequired?: Boolean;
}

const EmailTextField = ({ email, setEmail, isRegister, notRequired }: EmailProps) => (
  <TextField
    sx={{backgroundColor: "var(--base_site_MTColorLight, #fffbf8)"}}
    margin="normal"
    required = {!notRequired}
    fullWidth
    id="email"
    label="Email"
    name="email"
    autoComplete="email"
    autoFocus
    value={email}
    onChange={(event) => setEmail(event.target.value)}
    InputProps={isRegister ? { endAdornment: <EmailDisclaimer /> } : undefined}
  />
);

export { PasswordTextField, EmailTextField };
