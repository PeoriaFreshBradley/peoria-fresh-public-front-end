import { scaffoldSx } from "../styles";
import { NavBar } from "./layout/nav-bar";
import { Box, Typography } from "@mui/material";

export const ErrorPage = () => {
  return (
    <Box sx={scaffoldSx}>
      <NavBar />
      <Box component="main" sx={{ height: "100%" }}>
        <Typography component="title">Something went wrong.</Typography>
      </Box>
    </Box>
  );
};
