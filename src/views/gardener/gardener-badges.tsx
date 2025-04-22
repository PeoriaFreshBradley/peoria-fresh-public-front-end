
//Important Imports
import React, { useEffect, useState } from 'react';
import {Container, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import APIURL from "APIURL";                        //Need this for API Calls - This helped me make sure the API pathing was correct
import { useAppSelector} from "../../state/hooks";  //Need this for API Calls - This helped me pull the user's gardener data
import { instance as axios } from "axios-instance"; //Need this for API Calls - Import this instead of just axios, this is the correct thing according to Aidan
//This page is also being "imported" on app.tsx


//The variable "Badges" is part of what gets imported to "app.tsx"
export const Badges = () => {
  const navigate = useNavigate();

  const userInfo = useAppSelector((state: any) => state.userInfo);
  const [badges, setBadges] = useState([] as any[]);

  const getBadges = async () => {
    try {
      const res = await axios.get(
        `${APIURL}/badges/earned`
      ); 
      if (res.status === 200) {
        setBadges(res.data);
      }
    } catch (error) {
      console.error("Error updating leaderboard:", error);
    }
  }
  
  useEffect(() => {
      getBadges()
    }, []);

  return (
    <Container>
      {/*The code below here is the title, change the text that says "Badges" if you want to*/}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Typography variant="h2" color="var(--base_site_MTColorDark, #202d2b)" sx={{mt:3}}><strong>Badges</strong></Typography>
      </Grid>

      {/* Image Adam Worked on */}
      <Grid container spacing={2} justifyContent="center">
        {badges.map((badge, index) => (
          <Grid item xs={2} key={index}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box component="img" src={badge.earned ? badge.imageURL : badge.lockedImageURL} alt={`Badge ${index + 1}`} sx={{ width: "200px", height: "200px" }} />
              <Typography variant="body1" color="var(--base_site_MTColorDark, #202d2b)" align="center" sx={{ mt: 1 }}>
                Description: {badge.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Donation Badges Note*/}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: 3, mt: 5 }}>
        <Typography variant="h6" color="var(--base_site_secondaryTextColor)">
          (note: the ounces needed for badges are additive, meaning you can build up to unlocking a badge)
        </Typography>
      </Grid>                 

    </Container>
  );
}