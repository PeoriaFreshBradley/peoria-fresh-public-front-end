import { Box, Container, Typography } from "@mui/material";
import uiucExtension from '../../images/uiuc-extension.jpg';
import { useAppSelector } from "../../state/hooks";

export const FoodPantryFinder = () => {
  	const userInfo = useAppSelector((state: any) => state.userInfo);
	return (

<Container sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"100vw", minHeight:"100vh", overflow: "hidden"}} >
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%", height:"auto", maxWidth: "1200px", mt:4, mb:5}} >
        <Typography 
            variant="h2" 
            fontWeight="700" 
            color="var(--base_site_MTColorDark, #202d2b)" 
            sx={{paddingBottom:1, textAlign: "center", wordWrap: "break-word", maxWidth: "90%"}}
        >
            Hello {userInfo.userObj.gardenerProfile.name !== "" ? userInfo.userObj.gardenerProfile.name : "Gardener"}!
        </Typography>
        
        <Box sx={{
            display:"flex", 
            justifyContent:"center", 
            flexDirection:"column", 
            alignItems:"center", 
            width:"90%", 
            maxWidth: "800px", 
            minHeight:"auto",
            bgcolor:"var(--base_site_backdropColor, #f0c6a6)", 
            borderRadius:5,
            padding: 3,
            overflow: "auto"
        }} >
            <Typography 
                variant="h3" 
                fontWeight="500" 
                color="var(--base_site_MTColorDark, #202d2b)" 
                sx={{paddingBottom:1, textAlign: "center"}}
            >
                Find a Pantry
            </Typography>

            <Box sx={{
                display:"flex", 
                flexDirection:"column", 
                justifyContent:"center", 
                alignItems:"center", 
                width:"95%", 
                maxWidth: "600px", 
                bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", 
                borderRadius:5, 
                padding: 2,
                overflow: "auto"
            }}>
                <Typography sx={{ textAlign: "center", wordWrap: "break-word" }}>
                    1. Click the picture below to access FoodFinder.
                </Typography>
                <br />
                <Typography sx={{ textAlign: "center", wordWrap: "break-word" }}>
                    2. Allow the browser to access your location.
                </Typography>
                <br />
                <Typography sx={{ textAlign: "center", wordWrap: "break-word" }}>
                    3. To filter for nearby food pantries, click "Filters" and "Food Pantries & Meal Sites".
                </Typography>
                <br />
                <Typography sx={{ textAlign: "center", wordWrap: "break-word" }}>
                    4. You should now be able to see nearby food pantries!
                </Typography>
                <br />
                <a href={"https://foodfinder-il-widget.web.app/"} target={"_blank"}>
                    <img src={uiucExtension} style={{ borderRadius: "5px", maxWidth: "100%", height: "auto" }} />
                </a>
            </Box>
        </Box>
    </Box>
</Container>
	);
}