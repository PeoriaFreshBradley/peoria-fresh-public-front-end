import { Grid, Typography, TextField, Button } from "@mui/material";
//import APIURL from "../../APIURL";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const FormTeamPage = () => {
  //const navigate = useNavigate();
  const [formData, setFormData] = useState({ email1: '', email2: '', email3: '' });

  // Explicitly type the event parameter as React.ChangeEvent<HTMLInputElement>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {

    const teamform = formData;
    console.log(teamform);

    /*
    try {
      const response = await fetch("https://your-backend-url.com/api/teammates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log("Emails submitted successfully!");
        // Navigate or show success message if needed
        navigate("/garden/user-landing"); 
      } else {
        console.error("Failed to submit emails");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    */
  };

  return (
    <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
      
      {/* Title */}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", color: "var(--base_site_MTColorDark, #202d2b)" }}>
        <Typography variant="h3" align="center" gutterBottom>
          Thanks for Joining Teams!
        </Typography>
      </Grid>

      {/* Description */}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", color: "var(--base_site_MTColorDark, #202d2b)", marginTop: -2 }}>
        <Typography variant="body1" align="center" sx={{ fontSize: "1.2rem" }}>
          Below, enter the emails of your teammates.
        </Typography>
      </Grid>

      {/* Input Fields */}
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: "100%" }}>
        <TextField
          name="email1"
          label="Teammate Email 1"
          variant="outlined"
          value={formData.email1}
          onChange={handleChange}
          sx={{ width: "400px" }} // Adjust the width to your desired value
        />
        <TextField
          name="email2"
          label="Teammate Email 2"
          variant="outlined"
          value={formData.email2}
          onChange={handleChange}
          sx={{ width: "400px" }} // Adjust the width to your desired value
        />
        <TextField
          name="email3"
          label="Teammate Email 3"
          variant="outlined"
          value={formData.email3}
          onChange={handleChange}
          sx={{ width: "400px" }} // Adjust the width to your desired value
        />
      </Grid>

      {/* Submit Button */}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
