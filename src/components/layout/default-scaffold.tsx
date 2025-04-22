import { Box, Typography } from "@mui/material";
import { scaffoldSx } from "../../styles";
import { NavBar } from "./nav-bar";
import Footer from "./footer";
import { useRedirectAfterExpiry } from "../../functions/checkAuth";
import { PFButton } from "../designs/custom-button";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";

interface DefaultScaffoldProps {
  children: React.ReactNode;
  noSpaceAboveFooter?: boolean;
  longPage?: boolean; //long pages have a back to top button above the footer
  shortPage?: boolean; //stretches page so that the footer is at the bottom of the screen
  authType?: string;
  authorized?: boolean;
} ;

const DefaultScaffold = (
  { children, shortPage = false, noSpaceAboveFooter = false, longPage = false, authType = "none", authorized = true }: DefaultScaffoldProps
) => {

	useRedirectAfterExpiry();
  const navigate = useNavigate();
  const scrollableAreaRef = useRef<HTMLDivElement>(null);
  
  return (
    <Box sx={scaffoldSx}>
      {authType === "none" || authorized ?
      // What to show if the user is authorized
        <Box 
          ref={scrollableAreaRef}
          component="main"
          display={shortPage ? "flex" : undefined}
          flexDirection={shortPage ? "column" : undefined}
          justifyContent={shortPage ? "space-between" : undefined}
          sx={{ height: "100vh", overflowY: "auto"}}
        >
          <NavBar />
          <div>
          {children}
          </div>
          {!noSpaceAboveFooter && <Box sx={{ height: "50px" }} />}
          {longPage &&
            <Box sx={{ width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <PFButton 
                text="Back to top"
                onClick={() => {if( scrollableAreaRef.current ) scrollableAreaRef.current.scrollTop = 0}}
              />
            </Box>
          }
          <Footer />
        </Box>
      // What to show if it is a gardener page and the user is not an authorized gardener
      : authType === "gardener" ?
        <Box component="main" display="flex" flexDirection="column" justifyContent="space-between" sx={{ height: "100vh", overflowY: "auto" }}>
          <NavBar />
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" sx={{height: "75vh", paddingY: "200px"}}>
            <Typography textAlign="center">This page is only available to gardeners.</Typography>
            <Typography textAlign="center">Click one of the buttons below to sign in to an existing gardener account or to create a new gardener account.</Typography>
            <PFButton text="Sign in" onClick={() => {navigate("/sign-in")}}/>
            <PFButton text="Back to home screen" secondary={true} onClick={() => {navigate("/")}}/>
          </Box>
          <Footer />
        </Box>
        // What to show if it is a food bank admin page and the user is not an authorized food bank admin
      : authType === "foodBankAdmin" ?
        <Box component="main" display="flex" flexDirection="column" justifyContent="space-between" sx={{ height: "100vh", overflowY: "auto" }}>
          <NavBar />
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" sx={{height: "75vh", paddingY: "200px"}}>
          <Typography textAlign="center">This page is only available to food bank admins.</Typography>
          <Typography textAlign="center">Contact your food bank organizer or reach out to our team to see how you can get registered as a food bank admin.</Typography>
          <PFButton text="Back to home screen" secondary={true} onClick={() => {navigate("/")}}/>
          </Box>
          <Footer />
        </Box>
      : null
      }
    </Box>
  );
};

export default DefaultScaffold;
