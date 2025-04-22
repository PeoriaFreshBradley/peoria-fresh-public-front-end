import { SxProps } from "@mui/material/styles";

const optionSx: SxProps = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundSize: "cover",
    cursor: "pointer",
    position: "relative", // Ensure relative positioning for overlay 
    "&:hover::before": {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        background: "rgba(0, 0, 0, 0.2)", // Adjust opacity as needed
    },
    // Reset filter for the Typography elements to maintain brightness
    "&:hover .MuiTypography-root": {
        filter: "brightness(100%)",
    },
};

const flexBoxSx: SxProps = {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "100%",
};

const scaffoldSx: SxProps = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
}

export { optionSx, flexBoxSx, scaffoldSx }