import {
  Container,
  Grid,
  Typography,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AboutUsBanner from '../../images/AboutUsBanner.png'; 

export const AboutUs = () => {
    return (
        <Container sx={{ overflow:"hidden", display:"flex", justifyContent:"center", alignItem:"center", minWidth:"100%", height:"100%"}}>
          <Grid container sx={{ display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100%"}}>
            <Grid item sx={{ width:"100vw"}}>
              <Box sx={{ display:"flex", justifyContent:"center", alignItems:"center", minWidth:"100vw" }}>
                <img src={AboutUsBanner} 
                alt="A banner that says 'peoria FRESH About Us', featuring our tomato and orange mascots"
                style={{ width:"100%" }}/>
              </Box>
            </Grid>
            <Grid item sx={{ width:"100vw"}}>
              <Box sx={{ display:"flex", justifyContent:"center", alignItems:"center", Width:"100%", height:"90vh", bgcolor:"var(--base_site_backdropColor, #f0c6a6)", borderRadius:10, mt:6 }}>
                <Box sx={{m:1, display:"flex", flexDirection:"column", width:"45%", height:"95%", bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, overflow:"auto","&::-webkit-scrollbar": {width: "1px"} }} >
                <Typography variant="h3" sx={{ mt:2, display:"flex", justifyContent:"center", alignItems:"center", color:"var(--base_site_MTColorDark, #202d2b)" }} >About Us</Typography>
                  <Typography variant="h6" sx={{fontWeight:"regular", fontSize: "18px", m:2, textAlign:"center", color:"var(--base_site_MTColorDark, #202d2b)"}} >
                    The Peoria Fresh team consists of a group of Bradley University capstone students, 
                    led by Dr. Tony Grichnik. Our team currently working on the project is the third 
                    student capstone group to work on the project. Despite the 
                    rotation of new students onto the project each year, the core goal that led 
                    to the creation of the Peoria Fresh site has been retained due to the leadership 
                    of Dr. Grichnik, who has helped each team to adapt and overcome the challenges of 
                    contributing to this amazing cause.
                  </Typography>
                  <Typography variant="h6" sx={{fontWeight:"regular", fontSize: "18px", m:2, textAlign:"center", color:"var(--base_site_MTColorDark, #202d2b)"}} >
                    The core goal of Peoria Fresh is to get gardeners connected with local food banks and 
                    food pantries to help provide fresh goods to those in need. To enhance the experience 
                    for our gardeners, new and old, our team has been working on ways to spice 
                    up the gardening process. This resulted in the creation of a leaderboard and 
                    challenges to unlock badges, giving gardeners a whole new reason to grow and help their community. 
                    To help newer gardeners get started, we have provided the getting started page, which provides 
                    plenty of resources, videos, and websites for a newcomer to get accustomed to the gardening scene.
                  </Typography>
                </Box>
                <Box sx={{m:1, display:"flex", flexDirection:"column", width:"45%", height:"95%", bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, overflow:"auto","&::-webkit-scrollbar": {width: "1px"} }} >
                <Typography variant="h3" sx={{ mt:2, display:"flex", justifyContent:"center", alignItems:"center", color:"var(--base_site_MTColorDark, #202d2b)" }} >Useful Info</Typography>
                  <Typography variant="h6" sx={{fontWeight:"regular", fontSize: "18px", m:2, textAlign:"center", color:"var(--base_site_MTColorDark, #202d2b)", '& a': {color: "var(--base_site_MTColorDark, #202d2b)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} >
                  Another goal for our team this year was getting Peoria Fresh in as many users' hands as possible, 
                  making the website flow understandable, and making the site open source for those who 
                  would want to replicate Peoria Fresh for their own city. For those interested in the open source
                  aspect, here is a link to our <a href="https://github.com/PeoriaFreshBradley?tab=repositories">GitHub Repository</a>.
                  </Typography>
                  <Typography variant="h6" sx={{fontWeight:"regular", fontSize: "18px", m:2, textAlign:"center", color:"var(--base_site_MTColorDark, #202d2b)"}} >
                  For everybody else, we are going to take a brief tour of Peoria Fresh's navigation bar. The Gardener Dashboard contains 
                  links to the leaderboard. There you will see your total points and the points of the top 5 donators. If you do not wish 
                  your name to be displayed on the leaderboard for all to see, then set the leaderboard visibility toggle to private in the 
                  Gardener Dashboard. The dashboard also gives you access to view your badges. Badges can be obtained by making the top 5 for the 
                  leaderboard, donating a certain amount of produce, and completing other fun challenges. The dashboard will also show the produce you are currently growing.
                  The Getting Started page provides resources for newer gardeners, including 
                  youtube and website links for each donatable crop on our site. 
                  The Community Needs page shows crops that are requested by those in need (when requests have 
                  been made). Lastly, the Find a Food Pantry page will help you to find a food pantry near you.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
    );
}