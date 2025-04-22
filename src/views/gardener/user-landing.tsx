import {
  Container,
  Grid,
  Box,
  Divider
} from "@mui/material";
import { TextPictureOverlay } from "components/designs/text-picture-overlay";
import { Link } from "react-router-dom";
import donate from "../../images/donateFoodNow.jpg";
import garden from "../../images/donationGarden.jpg";

export const UserLandingPage = () => {
  return (
    <Container> 
      <Grid container spacing={2} sx={{display:"flex",justifyContent:"center", alignItems: "center", height:"80vh"}}>
        <Grid item xs={12} margin={5} sx={{display:"flex", justifyContent:"center", color:"var(--base_site_MTColorDark, #202d2b)"}}>
          <h1>How Would You Like to Start?</h1>
        </Grid>
        <Grid item xs={5} sx={{height:"60vh"}}> 
          <Link
              to={"/garden/donation-page"}
              className="blackLink"
            >
            <TextPictureOverlay
              pictureUrl={donate}
              text="Donate Food Now"
              description = "See what's needed or bring what you have"
            />
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Divider>OR</Divider>
          </Box>
        </Grid>
        <Grid item xs={5} sx={{height:"60vh"}}>
          <Link
            to={"/garden/dashboard"}
            className="blackLink"
            >
          <TextPictureOverlay
            pictureUrl={garden}
            text="Start My Donation Garden"
            description="Grow produce for the community"
          />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}