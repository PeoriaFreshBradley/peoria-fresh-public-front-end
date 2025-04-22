import { Box, Typography, Link } from "@mui/material";
import BlueRoofLabsLogoWhiteBlackBG from "../../images/BlueRoofLabsLogoWhiteBlackBG.svg";


const Footer = () => {

    return (
    <Box sx={{
        width: "100%",
        height: " 150px ",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "var(--base_site_MTColorDark, #202d2b)",
        color: "white",
    }}>
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Typography variant="body1" sx={{marginTop: "40px", marginX: "40px"}}>
                peoriafresh.org © 2025 All rights reserved.
            </Typography>
            <Typography variant="body1" sx={{marginTop: "40px", marginX: "40px"}}>
                Contact us: {" "} 
                <Link href="mailto:peoriafreshbradley@gmail.com" color="inherit">
                    peoriafreshbradley@gmail.com
                </Link>
            </Typography>
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Typography variant="body1" sx={{marginTop: "40px", marginLeft: "40px", marginRight: "15px"}}>
                Sponsored by {" "}
            </Typography>
            <Box sx={{marginTop: "45px", marginRight: "40px"}}>
                <img src={BlueRoofLabsLogoWhiteBlackBG} alt="Blue Roof Labs Logo" style={{height: "40px"}} />
            </Box>
        </Box>
    </Box>
    );
};

export default Footer;