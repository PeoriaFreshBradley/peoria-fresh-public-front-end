import {
    Container,
    Grid,
    Button,
    Typography
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";

  export const LeaderboardPage = () => {

    const navigate = useNavigate();
  
    return (
      <Container> 
        <Grid container spacing={2} sx={{display:"flex",justifyContent:"center", alignItems: "center", height:"80vh", flexDirection: "column"}}>
          
          {/* Title */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", color: "var(--base_site_MTColorDark, #202d2b)" }}>
            <Typography variant="h3">Leaderboard</Typography>
          </Grid>
  
          {/* Description */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", color: "var(--base_site_MTColorDark, #202d2b)" }}>
            <Typography variant="body1" align="center" sx={{ fontSize: "1.2rem" }}>
              Here are the rankings of teams. Good job everyone!
            </Typography>
          </Grid>
  
          {/* Buttons */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {/* To Top 5 Leaderboard */}
            <Button onClick={() => navigate("/garden/leaderboard-top5")}>
              Back to the Top 5
            </Button>
          </Grid>
  
  
        </Grid>
      </Container>
    );
  }