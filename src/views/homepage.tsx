import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { TextPictureOverlay } from "../components/designs/text-picture-overlay";
import seedling from "../images/homepage-grow-seedling.jpg";
import veggies from "../images/homepage-go-vegetables.jpg";
import banner from "../images/website-banner.png";
import { Link } from "react-router-dom";
import { useAppSelector } from "../state/hooks";

export const Homepage = () => {
  const userObj = useAppSelector((state: any) => state.userInfo.userObj);
  const isMobile = useMediaQuery("(max-width:912px)");

  if (isMobile) {
    return (
      <Box sx={{
        backgroundColor: "var(--base_site_bgColor, #fff6ee)", 
        width: "100vw", 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        textAlign: "center"
      }}>
        <Typography variant="h3" color="var(--base_site_MTColorDark, #202d2b)">
          If you are viewing this website on a mobile device, please save our link for later and view this website on a computer. Thank you!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container sx={{ height: "620px" }}>
        <Grid
          item
          xs={12}
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
      </Grid>
      <Grid container sx={{ height: "370px" }}>
        <Grid item xs={12} md={4} padding={3} textAlign={"center"}>
          <Box display="flex" flexDirection="column" height={"100%"} justifyContent={"center"}>
            <Typography variant="h4" fontWeight={"700"} color={"var(--base_site_MTColorDark, #202d2b)"}>
              What can we help you with today?
            </Typography>
            <Typography variant="h5" fontWeight={"500"} color={"var(--base_site_MTColorDark, #202d2b)"} marginTop={3}>
              Your single source for the services and resources you need to contribute.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Link to={userObj.gardenerProfile ? "/garden/user-landing" : "/sign-in"} className="blackLink">
            <TextPictureOverlay pictureUrl={seedling} text="Garden" borderRadius="0px" />
          </Link>
        </Grid>
        <Grid item xs={6} md={4}>
          <Link to={"/patron/produce"} className="blackLink">
            <TextPictureOverlay pictureUrl={veggies} text="Produce Survey" borderRadius="0px" />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};