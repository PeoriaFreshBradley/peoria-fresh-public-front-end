import {
  Container,
  Grid,
  Typography,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import leaderboard_top_5_pic from '../../images/leaderboard_top_5_pic.jpg'; 
import { useAppSelector } from '../../state/hooks';
import APIURL from "APIURL";                        //Need this for API Calls - This helped me make sure the API pathing was correct
import { instance as axios } from "axios-instance"; //Need this for API Calls - Import this instead of just axios, this is the correct thing according to Aidan
import { useState, useEffect } from "react";
import { DataObjectSharp } from "@mui/icons-material";


  export const Leaderboard = () => {

    const userInfo = useAppSelector((state: any) => state.userInfo);
    const [leaderboard, setLeaderboard] = useState([] as any[]);
    const [myuser, setmyuser] = useState({} as any);
    const [seasonInfo, setSeasonInfo] = useState({
      currentSeason: '',
      startDate: '',
      endDate: '',
      daysRemaining: 0
    });

  // Gets Leaderboard
  const getleaderboard = async () => {
    try {
        const res = await axios.get(`${APIURL}/gardeners/leaderboard`); 
        if (res.status === 200) {
            let leaderboardInfo = Object.keys(res.data.leaderboard).map(y => res.data.leaderboard[y]).sort((a,b) => b.score - a.score);
            setLeaderboard(leaderboardInfo);
            setSeasonInfo(res.data.seasonInfo);

            let myUserPlace = 0;
            for (let row of leaderboardInfo){
                myUserPlace++;
                if (userInfo.userObj.gardenerProfile.id === row.id){
                    row.name = userInfo.userObj.gardenerProfile.name;
                    setmyuser({scoreObject : row, place:myUserPlace});
                    break;
                }
            }
        }
    } catch (error) {
        console.error("Error updating leaderboard:", error);
    }
  }
    
    useEffect(() => {
        getleaderboard()
      }, []);


    let myUserName = userInfo.userObj.gardenerProfile.name !== "" ? userInfo.userObj.gardenerProfile.name : "Gardener";    
    const navigate = useNavigate();


    const leaderboardItem = (scoreObject : any, place : number) => {
        return <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", flexDirection:"column" , bgcolor:"var(--base_site_backdropColor, #f0c6a6)", width:"100%", height:"95%", borderRadius:10}}> {/* 2nd place outer box */}
        <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", width:"90%", height:"50%", mb:1.5, mt:1.5, borderRadius:5}}> {/* 2nd place inner box 1 */}
          <Typography variant="h1" sx={{fontSize:30, textAlign:"center", width:"100%"}}>{getPlace(place)} Place: {scoreObject.name}</Typography>
        </Box>
        <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", width:"90%", height:"50%", mb:1.5, borderRadius:5}}> {/* 2nd place inner box 2 */}
          <Typography variant="h1" sx={{fontSize:30, textAlign:"center", width:"100%"}}>{scoreObject.score} Points</Typography>
        </Box>
      </Box>
    }

    const emptyLeaderboardItem = () => {
      return <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", flexDirection:"column" , bgcolor:"var(--base_site_backdropColor, #f0c6a6)", width:"95%", height:"75%", borderRadius:10, m:1}}> {/* 2nd place outer box */}
      <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", width:"90%", height:"50%", mb:1.5, mt:1.5, borderRadius:5}}> {/* 2nd place inner box 1 */}
        <Typography variant="h1" sx={{fontSize:40, textAlign:"center", width:"100%"}}> No Player </Typography>
      </Box>
    </Box>
  }

    const getPlace = (place : number) => {
        if(place % 10 === 1){
          return `${place}st`
        }
        else if (place % 10 === 2){
          return `${place}nd`
        }
        else if (place  % 10 === 3){
          return `${place}rd`
        }
        else {
          return `${place}th`
        }
    }
  
    return (
      <Container sx={{mt:-2, mb:-8, padding:0, overflow:"hidden", display:"flex", justifyContent:"center", alignItem:"center", height:"100%", minWidth:"100%"}}>
        <Grid container sx={{display:"flex", justifyContent:"center", alignItems:"center",height:"100vh", minWidth:"80vw"}}> {/* This grid (like the container) contains all the page contents */}
          {/* LEFT HALF OF THE PAGE */}
          <Grid item sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column",height:"90vh", width:"50%"}}> {/* This grid will contain the left half of the page */}
            { myuser.scoreObject === undefined ? <Box sx={{height:"35%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}> {/* This box contains the top left box which will show the person's place and points */}
              <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", flexDirection:"column" , bgcolor:"var(--base_site_backdropColor, #f0c6a6)", width:"70%", height:"80%", borderRadius:10}}> {/* Outer box */}
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", width:"90%", height:"80%", borderRadius:5}}> {/* Top Inner box  */}
                  <Typography variant="h1" sx={{fontSize:40}}>You Have No Points!</Typography>
                </Box>
              </Box>
            </Box> 
            : <Box sx={{height:"35%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}> {/* This box contains the top left box which will show the person's place and points */}
              <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", flexDirection:"column" , bgcolor:"var(--base_site_backdropColor, #f0c6a6)", width:"70%", height:"80%", borderRadius:10}}> {/* Outer box */}
                <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", width:"80%", height:"35%", mb:1.5, borderRadius:5}}> {/* Top Inner box  */}
                  <Typography variant="h1" sx={{fontSize:40}}>{getPlace(myuser.place)} Place : {myUserName}</Typography>
                </Box>
                <Box sx={{display:"flex",justifyContent:"center", alignItems:"center" , bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", width:"80%", height:"35%", mt:1.5, borderRadius:5}}>{/* Botttom Inner box  */}
                  <Typography variant="h1" sx={{fontSize:40}}>{myuser.scoreObject !== undefined ? myuser.scoreObject.score : null} Points</Typography>
                </Box>
              </Box>
            </Box>}
            <Box sx={{height:"80%", width:"100%", display: "flex", justifyContent: "center", alignItems: "center"}}> {/* This box contains the picture on the bottom left half of the page */}
                <img src={leaderboard_top_5_pic} 
                alt="Little tomato mascot saying 'Check out the leaderboards!'"
                style={{ width:"100%", height:"100%"}}/>
            </Box>
          </Grid>
          {/* RIGHT HALF OF THE PAGE */}
          <Grid item sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", height: "90vh", width: "50%", bgcolor: "var(--base_site_buttonHoverColor, #50603b)", p: 2 }}>
          {/* Season Info Box - Full Width */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor: "var(--base_site_backdropColor, #f0c6a6)", width: "100%", mb: 4, p: 2, borderRadius: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {seasonInfo.currentSeason} Season
            </Typography>
            <Typography variant="body1">
              {seasonInfo.startDate} to {seasonInfo.endDate}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: 'var(--base_site_highlightColor)' }}>
              {seasonInfo.daysRemaining} days remaining
            </Typography>
          </Box>

              {/* 1st Place - Full Width */}
              <Box sx={{ width: "100%", mb: 3}}>
                {leaderboard[0] !== undefined ? leaderboardItem(leaderboard[0], 1) : emptyLeaderboardItem()}
              </Box>

              {/* 2nd and 3rd Place Row */}
              <Grid container sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                mb: 2,
              }}>
                {/* 2nd Place */}
                <Grid item xs={5}>
                  {leaderboard[1] !== undefined ? leaderboardItem(leaderboard[1], 2) : emptyLeaderboardItem()}
                </Grid>
                
                {/* 3rd Place */}
                <Grid item xs={5}>
                  {leaderboard[2] !== undefined ? leaderboardItem(leaderboard[2], 3) : emptyLeaderboardItem()}
                </Grid>
              </Grid>

              {/* 4th and 5th Place Row */}
              <Grid container sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}>
                {/* 4th Place */}
                <Grid item xs={5}>
                  {leaderboard[3] !== undefined ? leaderboardItem(leaderboard[3], 4) : emptyLeaderboardItem()}
                </Grid>
                
                {/* 5th Place */}
                <Grid item xs={5}>
                  {leaderboard[4] !== undefined ? leaderboardItem(leaderboard[4], 5) : emptyLeaderboardItem()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </Container>
    );
  }