import { Box, Typography } from "@mui/material";
import { optionSx } from "../../styles";
import caretRight from "../../images/icons/caretRight.svg";

interface TextPictureOverlayProps {
  pictureUrl: string;
  text?: string;
  description?: string; 
  borderRadius?: string;
  overlayHeight?: string;
  overlayText?: string;
}

export const TextPictureOverlay = ({
  pictureUrl,
  text = "",
  description = "", 
  borderRadius = "8px",
  overlayHeight = "",
  overlayText = "",
}: TextPictureOverlayProps) => {
  return (
      <Box position="relative" sx={{ ...optionSx, backgroundImage: `url(${pictureUrl})` ,height: "100%", width:"100%",backgroundSize:"cover", borderRadius: borderRadius}}>
        <Typography
          variant="h4"
          sx={{
            color:"var(--base_site_MTColorLight, #fffbf8)",
            fontWeight: "bold",
            wordWrap:"break-word",
          }}
        >
          {text}
        </Typography>
        <Typography
          variant="body1" 
          sx={{
            color:"var(--base_site_MTColorLight, #fffbf8)",
            fontWeight: "bold",
            wordWrap:"break-word",
          }}
        >
          {description}
        </Typography>
        
        {/** An overlay meant to be an alternative for having text over an image */}
        {overlayText && <Box 
        sx=
        {{ 
          position: "absolute", 
          bottom: 0, 
          width: "100%", 
          height: overlayHeight, 
          backgroundColor: "rgba(192,157,157,1)", 
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          }}>
          <Typography variant="h5" fontWeight="600" padding={2}>
            {overlayText}
          </Typography>
          {overlayText && (
            <img width="30px" height="30px" src={caretRight} alt=""/>
          )}
        </Box>}
      </Box>
  );
};