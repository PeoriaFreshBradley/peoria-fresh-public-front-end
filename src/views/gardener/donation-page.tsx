import {
  Container,
  Grid,
  Box, 
  Divider
} from "@mui/material";
import { TextPictureOverlay } from "components/designs/text-picture-overlay";
import { Link } from "react-router-dom";
import coomNeeds from "../../images/commNeeds.jpg";
import foodPantry from "../../images/findFoodPantry.jpg";

export const DonationPage = () => {
  return (
    <Container> 
      <Grid container spacing={2} sx={{display:"flex",justifyContent:"center", alignItems: "center", height:"80vh"}}>
        <Grid item xs={12} margin={5} sx={{display:"flex", justifyContent:"center", color:"var(--base_site_MTColorDark, #202d2b)"}}>
          <h1>Ways to Donate</h1>
        </Grid>
        <Grid item xs={5} sx={{height:"60vh"}}> 
        <Link
            to={"/garden/produce"}
            className="blackLink"
        >
          <TextPictureOverlay
            pictureUrl={coomNeeds}
            text="Community Needs"
            description = "Donate food where the community needs it most"
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
            to={"/garden/findapantry"}
            className="blackLink"
          >
            <TextPictureOverlay
              pictureUrl={foodPantry}
              text="Find a Food Pantry"
              description="Find a pantry that works for you"
            />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}