import{AddressDialogJoinTeams} from "views/patron/patron-helpers/request-address";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";

export const JoinTeamsPage = () => {

  /* These variables are used to select either formTeam or joinPool for the user */
  const [formTeam, setFormTeam] = useState(false);
  const [joinPool, setJoinPool] = useState(true);

  /* These variables deal with the address portion of the page*/
  const [openDialog, setOpenDialog] = useState(false);
  const [addressConfirmed, setAddressConfirmed] = useState(false);

  /* These variables are used in later functions to deal with color for hovering over elements */
  const [hoveredAddress, setHoveredAddress] = useState(false);
  const [hoveredFormTeam, setHoveredFormTeam] = useState(false);
  const [hoveredJoinPool, setHoveredJoinPool] = useState(false);
  const [hoveredSubmit, setHoveredSubmit] = useState(false);

  /* These variables are used to navigate the user to the correct page */
  const [selected, setSelected] = useState(false);  
  const navigate = useNavigate();

  /* these 2 functions deal with formTeam and joinPool */
  const handleFormTeam = () => {
    setFormTeam(true);
    setJoinPool(false);
  }

  const handleJoinPool = () => {
    setJoinPool(true);
    setFormTeam(false);
  }

  /* These 2 functions deal with opening and closing the address dialog */
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAddressConfirmed(true);
  };

  const handleSelected = () => {
    setSelected(true);
  };

  /* This function makes sure are information is entered before taking the user to the correct page */
  const handleSubmit = () => {
    if(!addressConfirmed || !selected){
      alert("Please enter your address and experience before submitting.")
      return;
    }
    if(formTeam){
      navigate("/garden/form-team");
    }else if(joinPool){
        navigate("/garden/join-pool");
    }else{
        alert("Please select a team option before submitting.");
    }
  };

  return (
    <Container maxWidth="sm"> 

      {/* This box contains the contents of the rest of the form */}
      <Box sx={{mb:-4}} alignItems="center" display="flex" justifyContent="center" height="100" flexDirection="column">
        
        {/* This box only contains the thanks text at the top of the page */}
        <Box alignItems="center" display="flex" justifyContent="center" height="100" flexDirection="column">

          <Typography variant="h4" sx={{margin: 2}}>Thanks For Joining Teams!</Typography>

        </Box>

        {/* This box contains the "please fill out..." text and the box containing the rest of the survey */}
        <Box sx={{bgcolor:"var(--base_site_backdropColor, #f0c6a6)", paddingY:3, paddingX:8, borderRadius:5}} alignItems="center" display="flex" justifyContent="center" height="100" flexDirection="column">

          <Typography variant="h5" align="center" sx={{ paddingY:1 }}>
            Please Fill Out This Quick Survey:
          </Typography>

          {/* This is the survey, starting with experience level and ending with joining a team or the pool */}
          <Box sx={{bgcolor:"var(--base_site_backdropAccentColor, #eeba94)", paddingY:4, paddingX:6, borderRadius:5}} alignItems="center" display="flex" justifyContent="center" height="100" flexDirection="column">

            {/* This typography and FormControl section deal with getting the user's experience */}
            <Typography variant="h5" align="center" sx={{marginBottom: 0.9, marginTop:-1.5}}>
              Experience Level?
            </Typography>

            <FormControl sx={{
              width: "65%", 
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--base_site_buttonHoverColor, #50603b)" }, // Default border color
              }}> 
              <InputLabel id="experience-level-label">Gardening Experience </InputLabel>
              <Select 
                labelId="experience-level-label"
                id="experience-level"
                label="Your Gardening Experience Level"
                name="experence-level">
                  {/* Each of these items onClick() is selected */}
                  <MenuItem onClick={() => handleSelected()} value="Beginner">Beginner</MenuItem>
                  <MenuItem onClick={() => handleSelected()} value="Intermediate">Intermediate</MenuItem>
                  <MenuItem onClick={() => handleSelected()} value="Proficient">Proficient</MenuItem>
              </Select>
            </FormControl>

            {/* This typography, the button underneath, and the AddressDialogJoinTeams all deal with getting the users address */}
            <Typography variant="h5" align="center" sx={{ fontSize: "1.2rem", marginTop: 1.2 }}>
              Please Enter Your Address
            </Typography>

            <Button 
            onClick={handleOpenDialog} 
            onMouseEnter={() => setHoveredAddress(true)} 
            onMouseLeave={() => setHoveredAddress(false)} 
            style={{backgroundColor: hoveredAddress ? "var(--base_site_buttonHoverColor, #50603b)" : "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))", 
            color: "white", padding: "10px 20px", margin:"5px"}}>
              {addressConfirmed ? "Address Entered" : "Click to Begin Entering"}
            </Button>
            
            {/* This is what gathers the user's address. For info on how it works, go to request-address.tsx */}
            <AddressDialogJoinTeams open={openDialog} onClose={handleCloseDialog} />     
      
            <Typography variant="h5" align="center" sx={{ marginTop: 1, fontSize: "1.2rem" }}>
              Form a Team or Join the Team Pool?
            </Typography>

            {/* This two chunks of code deal with switching the selected text depending on which option the user selects */}
            {formTeam && (
              <Typography variant="subtitle1" align="center" sx={{ color: "Black", mt: -0.2, mb: -1.8 }}>
                  You have selected "Form a Team".
              </Typography>
            )}

            {joinPool && (
              <Typography variant="subtitle1" align="center" sx={{ color: "Black", mt: -0.2, mb:-1.8 }}>
                You have selected "Join the Pool".
              </Typography>
            )}

            {/* This grid contains the joinPool and formTeam buttons, keeping them positioned together */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2, mb:-1.2, alignItems: "center" }}>
              <Button 
              onClick={() => handleFormTeam()} 
              onMouseEnter={() => setHoveredFormTeam(true)} 
              onMouseLeave={() => setHoveredFormTeam(false)} 
              style={{ backgroundColor: formTeam ? "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" : "var(--base_site_destructiveButtonHoverColor, #d35c4c)", 
              color: "white", padding: "10px 20px", margin:"5px", cursor: "pointer", 
              ...(hoveredFormTeam && {backgroundColor: formTeam ? "var(--base_site_buttonHoverColor, #50603b)" : "var(--base_site_destructiveButtonColor"}) }}>
                Form a Team
              </Button>
          
              <Button 
              onClick={() => handleJoinPool()} 
              onMouseEnter={() => setHoveredJoinPool(true)} 
              onMouseLeave={() => setHoveredJoinPool(false)} 
              style={{ backgroundColor: joinPool ? "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" : "var(--base_site_destructiveButtonHoverColor, #d35c4c)", 
              color: "white", padding: "10px 20px", margin:"5px", cursor: "pointer",
              ...(hoveredJoinPool && {backgroundColor: joinPool ? "var(--base_site_buttonHoverColor, #50603b)" : "var(--base_site_destructiveButtonColor, #a44433)"}) }}>
                Join the Pool
              </Button>
            </Grid>

          </Box>

        </Box>

          {/* this button submits the contents of the page...still gotta figure out backend tho */}
          <Button
          onClick={handleSubmit} 
          onMouseEnter={() => setHoveredSubmit(true)} 
          onMouseLeave={() => setHoveredSubmit(false)} 
          style={{backgroundColor: hoveredSubmit ? "var(--base_site_buttonHoverColor, #50603b)" : "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))", 
          color: "white", padding: "10px 25px", marginLeft:"5px", marginRight:"5px", marginTop:13.5}}>
            Submit
          </Button>

      </Box>

    </Container>
  );
}