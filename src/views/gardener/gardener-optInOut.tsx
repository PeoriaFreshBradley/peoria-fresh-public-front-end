import {
  Grid,
  Button, //Currently in the giant commented out section of code - Delete when doing the final sweep through
  Typography,
  Box,
  Divider, //Currently in the giant commented out section of code - Delete when doing the final sweep through
  Container, 
} from "@mui/material";
import { useNavigate } from "react-router-dom";     //Need this for API Calls - Used in rerouting to other pages, if you aren't rerouting, then it isn't necessary
import APIURL from "APIURL";                        //Need this for API Calls - This helped me make sure the API pathing was correct
import { useAppSelector} from "../../state/hooks";  //Need this for API Calls - This helped me pull the user's gardener data
import { instance as axios } from "axios-instance"; //Need this for API Calls - Import this instead of just axios, this is the correct thing according to Aidan

export const OptInLandingPage = () => { //Cam Changed this line of code; It was originally
  const userInfo = useAppSelector((state: any) => state.userInfo); //Need this for API Calls, userInfo is used in the API pathing
  const navigate = useNavigate();

//Opting-In Code
const handleOptIn = async () => {
  try {
    const res = await axios.patch(
      `${APIURL}/gardeners/${userInfo.userObj.gardenerProfile.id}`, //This is the pathing that can update a gardener's table; do NOT put what you're updating in the path, that's a few lines down
      { isPlayer: true } //This is where you put what is updating and then what you're updating it to. 
    ); 
    if (res.status === 200) { //If the backend change was successful, it routes to another page
      navigate("/garden/user-landing"); //When working on teams, change this navigate link to "/garden/join-teams" with the quotes
    }
  } catch (error) { //If the backend change fails nothing looks like it's happening, BUT if you inspect element and then go to Network, you can see what the exact error code is
    console.error("Error updating isPlayer:", error);
  }
};

//Opting-Out Code - This does the same thing as above, but the value is being updated to false
const handleOptOut = async () => {
  try {
    const res = await axios.patch(
      `${APIURL}/gardeners/${userInfo.userObj.gardenerProfile.id}`,
      { isPlayer: false }
    ); 
    if (res.status === 200) {
      navigate("/garden/user-landing");
    }
  } catch (error) {
    console.error("Error updating isPlayer:", error);
  }
};

  return (

<Container sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh"
}}>
    <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "90%",
        height: "70%",
        bgcolor: "var(--base_site_backdropColor, #f0c6a6)",
        borderRadius: 5,
        marginTop:-7
    }}>
        <Typography variant="h3" fontWeight="700" color="var(--base_site_MTColorDark, #202d2b)" 
            sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom:2
            }}>
            Would You Like to Join the Leaderboard Competition?
        </Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            height: "70%",
            bgcolor: "var(--base_site_backdropAccentColor, #eeba94)",
            borderRadius: 5
        }}>
            <Typography variant="h4" fontWeight="500" color="var(--base_site_MTColorDark, #202d2b)" 
                sx={{
                    textAlign: "center",
                    paddingTop: 8.5
                }}>
                Join to Compete Against Other Gardeners on the Leaderboard!
            </Typography>
            <Grid item sx={{
                width: "100%",
                height: "100%",
                bgcolor: "var(--base_site_backdropAccentColor, #eeba94)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                gap: 3,
                mb: 2,
                mt: 2
            }}>
                <Button sx={{ width:"40%", height:"50%", borderRadius: "1.5625rem", bgcolor:"var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))", "&:hover":{bgcolor:"var(--base_site_buttonHoverColor, #50603b)"} }} onClick={handleOptOut} >
                  <Typography variant="h3" >Opt Out</Typography>
                </Button>                
                <Typography variant="h5" sx={{ textAlign: "center" }}> 
                    or 
                </Typography>
                <Button sx={{ width:"40%", height:"50%", borderRadius: "1.5625rem", bgcolor:"var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))", "&:hover":{bgcolor:"var(--base_site_buttonHoverColor, #50603b)"} }} onClick={handleOptIn} >
                  <Typography variant="h3" >Opt In</Typography>
                </Button>
            </Grid>
        </Box>
    </Box>
</Container>
     );
}