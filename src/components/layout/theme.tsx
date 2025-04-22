// this controls the overall colors and styling of mui stuff in PF
// documentation: https://mui.com/material-ui/customization/theming

import { createTheme } from "@mui/material";

const pFreshTheme = createTheme({
  typography: {
    fontFamily: "Rubik",
    button: {
      textTransform: "none",
      fontFamily: "Rubik",
    },
    h1: {
      fontFamily: "Poppins"
    },
    h2: {
      fontFamily: "Poppins"
    },
    h3: {
      fontFamily: "Poppins"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&.Garden": {
            ":last-child": {
              paddingBottom: "0px",
            },
          },
        },
      },
    },
  },
});

export default pFreshTheme;
