import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
//This page appears on the NavBar at the top of the screen; go to src > layout > nav-bar.tsx to add more to it you need to.
//This page is also being "imported" on app.tsx

// Importing images - If you'd like to make the boxes have images behind them then you should import here.
import Peoria_Fresh_Resource_Asset_1 from '../../images/gettingStartedImages/Peoria_Fresh_Resource_Asset_1.png'; 
import Peoria_Fresh_Resource_Asset_2 from '../../images/gettingStartedImages/Peoria_Fresh_Resource_Asset_2.png'; 
import Peoria_Fresh_Resource_Asset_3 from '../../images/gettingStartedImages/Peoria_Fresh_Resource_Asset_3.png'; 
import Peoria_Fresh_Resource_Asset_4 from '../../images/gettingStartedImages/Peoria_Fresh_Resource_Asset_4.png'; 

//The variable "GettingStartedPage" is part of what gets imported to "app.tsx"
export const GettingStartedPage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", width:"100%" }}>
      <Box sx={{ display:"flex", justifyContent:"center", margin:0.5 }}>
        <Typography variant="h1" color="var(--base_site_MTColorDark, #202d2b)"><strong>Getting Started</strong></Typography>
      </Box>
      <Box sx={{ display:"flex", justifyContent:"center", mb:-3 }}>
        <a href={"https://territorialseed.com/"} target={"_blank"} > {/* Each of the photos is 780 x 720 by default */}
          <img src={Peoria_Fresh_Resource_Asset_1} style={{ maxWidth:"100%", maxHeight:"100%"}} />
        </a>
        <a href={"https://www.starkbros.com/"} target={"_blank"} >
          <img src={Peoria_Fresh_Resource_Asset_2} style={{ maxWidth:"100%", maxHeight:"100%"}} />
        </a>
      </Box>
      <Box sx={{ display:"flex", justifyContent:"center", mt:-3 }}>
        <a href={"https://www.orangepippin.com/"} target={"_blank"} >
          <img src={Peoria_Fresh_Resource_Asset_3} style={{ maxWidth:"100%", maxHeight:"100%"}} />
        </a>
        <a href={"https://www.usda.gov/"} target={"_blank"} >
          <img src={Peoria_Fresh_Resource_Asset_4} style={{ maxWidth:"100%", maxHeight:"100%"}} />
        </a>
      </Box>
      {/* https://www.starkbros.com/ https://territorialseed.com/ https://www.usda.gov/ https://www.orangepippin.com/ */}

      <Box sx={{ display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", bgcolor:"var(--base_site_backdropColor, #f0c6a6)", width:"80%", borderRadius:7, padding:1.5 }}>
        <Box sx={{ display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"90%", marginTop:2 }} >
          <Typography variant="h3" color="var(--base_site_MTColorDark, #202d2b)" >Additional Information</Typography>
          <Typography variant="subtitle1" color="var(--base_site_MTColorDark, #202d2b)" >Here are Youtube videos and gardening articles to help you get started!</Typography>
        </Box>
        <Box sx={{ display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", width:"95%", marginBottom:2 }}>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"80%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Arugula</strong> - <a href="https://farmplasticsupply.com/blog/how-to-plant-and-grow-arugula" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://youtu.be/NexfxyDv28g?feature=shared" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"75%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Asparagus</strong> - <a href="https://extension.illinois.edu/blogs/good-growing/2021-03-26-how-successfully-grow-asparagus-your-garden" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://youtu.be/l5jaOYly-jI?feature=shared" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"70%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Baby Spinach</strong> - <a href="https://extension.illinois.edu/gardening/spinach" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://youtu.be/dZ0XtUGuUL4?feature=shared" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Banana</strong> - <a href="https://extension.illinois.edu/plants/banana" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://youtu.be/cOY2-rr4nJk?feature=shared" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Banana Pepper</strong> - <a href="https://gardenerspath.com/plants/vegetables/grow-banana-peppers/" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://youtu.be/EscCh57fHcQ?feature=shared" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Blackberry</strong> - <a href="https://www.almanac.com/plant/blackberries" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://youtu.be/rL69vR_Xz98?feature=shared" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Blueberry</strong> - <a href="https://www.almanac.com/plant/blueberries" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://youtu.be/6TXBIcizCYk?si=1w0cnMyPJItuP5J2" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Bok Choy</strong> - <a href="https://www.almanac.com/plant/bok-choy" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://youtu.be/opmsG0r69L4?si=3LhMU6si20_sjeaN" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Broccoli</strong> - <a href="https://www.rhs.org.uk/vegetables/broccoli/grow-your-own" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=kr1FoZ-tQ0Y" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Brussel Sprouts</strong> - <a href="https://www.almanac.com/plant/brussels-sprouts" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=TioJd76SIJg" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Butternut Squash</strong> - <a href="https://www.gardeningknowhow.com/edible/vegetables/squash/growing-butternut-squash.htm" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=VEmzVZNnquA" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Cantaloupe</strong> - <a href="https://bonnieplants.com/blogs/how-to-grow/growing-cantaloupe-and-honeydew-melons" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=r6c3eKTswJY" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>            </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Carrot</strong> - <a href="https://extension.usu.edu/yardandgarden/research/carrots-in-the-garden" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=d22VS6lktcg" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Celery</strong> - <a href="https://extension.usu.edu/yardandgarden/research/celery-in-the-garden" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=S9-wNVaDmew" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Cherry</strong> - <a href="https://www.almanac.com/plant/cherries" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=M04gRvISmZE" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Cherry Pepper</strong> - <a href="https://www.gardeningknowhow.com/edible/vegetables/pepper/grow-sweet-cherry-peppers.htm" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=cFVjZsNXe8M" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Cherry Tomato</strong> - <a href="https://www.southernliving.com/garden/edible/how-to-grow-cherry-tomatoes-1002672182" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=nEBca7b4z1U" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Chives</strong> - <a href="https://www.gardeningknowhow.com/edible/herbs/chives/growing-chives.htm" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=huUNsLgW8MI" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Collard Greens</strong> - <a href="https://www.almanac.com/plant/collard-greens" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=wCzT2wtPjOg" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Cucumber</strong> - <a href="https://www.almanac.com/plant/cucumbers" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=PTc-WphgA70" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Fuji Apple</strong> - <a href="https://www.gardeningknowhow.com/edible/fruits/apples/caring-for-fuji-apple-trees.htm" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=OSEDK0r-5Kc" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Gala Apple</strong> - <a href="https://www.starkbros.com/products/fruit-trees/apple-trees/gala-apple#:~:text=The%20Gala%20apple%20tree%20prefers,growth%20and%20optimal%20fruit%20development." target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://m.youtube.com/watch?v=cWpQRdWLjTE" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Garlic</strong> - <a href="https://www.almanac.com/plant/garlic" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=UgbWxSqpqws" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Gold Potato</strong> - <a href="https://www.idigorganics.com/crops/growing-potatoes.html" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=Z0IlHy6JRZI" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Granny Smith Apple</strong> - <a href="https://www.epicgardening.com/granny-smith-apple-tree/" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=6QDmuKfFIAU&vl=en-US" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Green Beans</strong> - <a href="https://joegardener.com/how-do-i-grow-green-beans/" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=LYQcwc-dfVo" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Eggplant</strong> - <a href="https://www.almanac.com/plant/eggplant" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=tylE2mIV6v0" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Green Bell Pepper</strong> - <a href="https://www.gardenerspath.com/plants/vegetables/grow-green-bell-peppers/" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=U34iDjZyc6Q" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Green Cabbage</strong> - <a href="https://www.almanac.com/plant/cabbage" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=GtfZs6B0gYk" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Green Grape</strong> - <a href="https://extension.umn.edu/fruit/growing-grapes-home-garden" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=8Ik7b6UcDP8" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Green Jalapeno</strong> - <a href="https://www.almanac.com/plant/jalapeno-peppers" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=4-I6Sphhm4U" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Green Lettuce</strong> - <a href="https://www.almanac.com/plant/lettuce" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=fB4VDwbSu80" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Green Onion</strong> - <a href="https://www.allrecipes.com/article/save-money-diy-fresh-green-onions/" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=kfTr9nYogW8" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Honeycrisp Apple</strong> - <a href="https://www.thisoldhouse.com/gardening/reviews/honeycrisp-apple-trees" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=Qzhvr25jNbY" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Iceberg Lettuce</strong> - <a href="https://www.epicgardening.com/iceberg-lettuce/" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=iAlqWHnjIwE" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Jackfruit</strong> - <a href="https://www.thespruce.com/grow-jackfruit-trees-1902445" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=25QAbKkzTbk" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Kale</strong> - <a href="https://www.almanac.com/plant/kale" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=3hL_NWw5C5M" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Leek</strong> - <a href="https://bonnieplants.com/blogs/how-to-grow/growing-leeks" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=SwLGB1WT66Y" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Lemon</strong> - <a href="https://www.marthastewart.com/how-to-grow-lemon-tree-from-seed-7480941" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=XC67v3q-m28" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Lime</strong> - <a href="https://www.planetnatural.com/lime-tree/" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=foz9FVhbcjA" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Mustard Greens</strong> - <a href="https://www.almanac.com/plant/mustard-greens" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=wqNcvZ4Q7n4" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Okra</strong> - <a href="https://bonnieplants.com/blogs/how-to-grow/growing-okra" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=RU7cBD14iQ8" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Orange</strong> - <a href="https://www.thespruce.com/orange-tree-growing-guide-6541613" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=n2nYr-Kf5rQ" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Orange Bell Pepper</strong> - <a href="https://www.smartgardener.com/plants/995-peppers-orange-bell/overview" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=X6YmH-ZNlEQ" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Orange Habanero</strong> - <a href="https://www.masterclass.com/articles/habanero-plant" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=CeCc6F5zLbE" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Peach</strong> - <a href="https://www.azurefarmlife.com/farm-blog/how-to-grow-your-own-peach-trees" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=pPuS8iCJdpk" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Pear</strong> - <a href="https://www.almanac.com/plant/pears" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://m.youtube.com/watch?v=Cwr19AMRuWs" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Peas</strong> - <a href="https://www.almanac.com/plant/peas" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=w5okXvK_RQs" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Radish</strong> - <a href="https://www.almanac.com/plant/radishes" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=40eHzQOK5C4" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Raspberry</strong> - <a href="https://www.almanac.com/plant/raspberries" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=gI5k84xK2Xg" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Red Bell Pepper</strong> - <a href="https://bonnieplants.com/blogs/how-to-grow/growing-peppers" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://m.youtube.com/watch?v=EP8TBK3FTHo" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Red Cabbage</strong> - <a href="https://www.quickcrop.ie/learning/plant/red-cabbage?srsltid=AfmBOoppFXvI2U55C5H8kv9gSiU4lymp-9HXORncFt8pru35P2grEnGg" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=K0bVaz4U24c" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Red Delicious Apple</strong> - <a href="https://www.gardeningknowhow.com/edible/fruits/apples/red-delicious-apple-info.htm" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=1OqXRcguFsg" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Red Grapes</strong> - <a href="https://extension.umn.edu/fruit/growing-grapes-home-garden" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=8Ik7b6UcDP8" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Red Habanero</strong> - <a href="https://www.gardeningknowhow.com/edible/vegetables/pepper/growing-habanero-peppers.htm" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=a9-nfPLqdt4" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Red Jalapeno</strong> - <a href="https://sproutedgarden.com/jalapeno-peppers/" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=Ejg9j_Mb5eQ" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Red Lettuce</strong> - <a href="http://www.heirloom-organics.com/guide/va/1/guidetogrowingredleaflettuce.html" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=NbdYNWYXllo" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Red Onion</strong> - <a href="https://www.thespruce.com/red-onions-7110784#:~:text=Plant%20red%20onion%20sets%20one,12%20to%2018%20inches%20apart" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=5AzTxLDL-hk" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Red Potato</strong> - <a href="https://www.hgtv.com/outdoors/flowers-and-plants/vegetables/growing-red-potatoes#:~:text=Growing%20Red%20Potatoes&text=Before%20planting%2C%20cut%20seed%20potatoes,month%20after%20plants%20start%20growing" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=zxDH-Y6y0QA" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Romaine Lettuce</strong> - <a href="https://www.gardenary.com/blog/how-to-grow-your-own-romaine-lettuce" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=3HgrPyyuc7A" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Russet Potato</strong> - <a href="https://extension.umn.edu/vegetables/growing-potatoes" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=JceNdu5kKAQ" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Snap Green Beans</strong> - <a href="https://extension.illinois.edu/gardening/snap-beans#:~:text=Plant%20seeds%20of%20all%20varieties,with%2030%20inches%20between%20rows" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=kEZy95aqGCA" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Spinach</strong> - <a href="https://www.almanac.com/plant/spinach" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=l1OwqEtx13E" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Strawberry</strong> - <a href="https://www.almanac.com/plant/strawberries" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=vGE2P9kPNUg" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Sweet Potato</strong> - <a href="https://www.almanac.com/plant/sweet-potatoes" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=8kjI3Nu9L4U" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Tomato</strong> - <a href="https://www.almanac.com/plant/tomatoes" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=0TbxPV3pu6U" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Turnip</strong> - <a href="https://www.almanac.com/plant/turnips" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=vKzs65CPM98" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Watermelon</strong> - <a href="https://extension.usu.edu/yardandgarden/research/watermelon-in-the-garden#:~:text=Watermelons%20grow%20best%20in%20sunny,in%20mounds%204%20feet%20apart" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://m.youtube.com/watch?v=Am2KWnxJA3k" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>White Onion</strong> - <a href="https://www.almanac.com/plant/onions" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=Xr_QTp2J9Ek" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Yellow Bell Pepper</strong> - <a href="https://www.almanac.com/plant/bell-peppers" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=faMDOe5aWuM" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"65%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Yellow Jalapeno</strong> - <a href="https://www.almanac.com/plant/jalapeno-peppers" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=pbpPxr3Rbfg" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"70%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Yellow Squash</strong> - <a href="https://bonnieplants.com/blogs/how-to-grow/growing-squash" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=-CgxOhChH5Q" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
          <Typography sx={{margin:1.5, bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"75%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
            <strong>Zucchini</strong> - <a href="https://www.almanac.com/plant/zucchini" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://www.youtube.com/watch?v=V8gGdMdQQ8E" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

{/* Here is a template if you want to add more fruits or veggies (try to keep the spacing consistent):
  <Typography sx={{bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", borderRadius:5, width:"75%", textAlign:"center", '& a': {color: "var(--base_site_mainTextColor)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'}}} variant="body1">
    <strong>Asparagus</strong> - <a href="https://extension.illinois.edu/blogs/good-growing/2021-03-26-how-successfully-grow-asparagus-your-garden" target="_blank" rel="noopener noreferrer">Website Tutorial</a> - <a href="https://youtu.be/l5jaOYly-jI?feature=shared" target="_blank" rel="noopener noreferrer">Youtube Tutorial</a>
  </Typography>
  */}