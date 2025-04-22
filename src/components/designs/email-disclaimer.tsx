import { useState } from "react";
import { Button, Dialog, DialogTitle, Typography, Box } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { PFButton } from "./custom-button";

const EmailDisclaimer = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        <InfoOutlined />
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Why do we need your email?</DialogTitle>
        <Box paddingBottom={4} paddingLeft={4} paddingRight={4}>
          <Typography>
            We only collect your email to get in touch with you during growing
            seasons and as a verification method for resetting your password. We
            will not send you spam or sell your data.
          </Typography>
        </Box>
        <PFButton text="Close" onClick={() => setOpen(false)}
        sx={{
          borderRadius:"0px",
        }}
        />
      </Dialog>
    </div>
  );
};

export default EmailDisclaimer;
