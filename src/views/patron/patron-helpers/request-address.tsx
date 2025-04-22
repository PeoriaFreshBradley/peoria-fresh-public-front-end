import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { AddressType, MapsAutoComplete } from "components/maps";

/*
    This helper is for asking patrons which food bank/pantry they want their requests delivered to. 
It exports a dialog box you can use and it will pop up asking what the address is, or users can choose to not answer.
The result is stored in the localStorage for the browser. 

This helper also exports a method to safely retrieve what the address they put (or didn't put) into the system was.

*/

export const getAddressForRequest = () => {
    // Return null if they chose not to enter the address, and return whatever is in localStorage if they did not skip the entry.
    if (localStorage.getItem("doesNotStoreAddress") === "true") {
        return null;
    }
    else {
        let tmp = localStorage.getItem("requestFrom");
        if (tmp !== null) {
          return JSON.parse(tmp);
        }
        return null;
    }
}

export const AddressDialogJoinTeams = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [errorState, setErrorState] = useState(true);
  const [address, setAddress] = useState({} as any);

  const finalizeTextFieldValue = () => {
    if (errorState) {
      alert("You can't save this address. Please enter a valid street address");
    }
    else {
      onClose();
      localStorage.setItem("requestFrom", JSON.stringify(address));
      localStorage.setItem("doesNotStoreAddress", "false");
    }
}

const processAddress = (addr: AddressType, isValid: boolean) => {
  if (!isValid) {
    alert("Please select a valid street address.");
    setErrorState(true);
  }
  else {
    setErrorState(false);
    setAddress(addr);
  }
}

return (
    <Dialog open={open} 
    onClose={(_, reason) => {
      if (reason === "backdropClick" || reason === "escapeKeyDown") {
        return;
      }
      onClose();
    }}>
      <DialogTitle>Please Enter Your Address</DialogTitle>
      <DialogContent>
        <MapsAutoComplete giveMeTheAddress={(selected:any, isValid: boolean) => {processAddress(selected, isValid);}}/>
      </DialogContent>
      <DialogActions>
      <Button variant="contained" 
        onClick={finalizeTextFieldValue} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        style={{ backgroundColor: isHovered ? "var(--base_site_buttonHoverColor, #50603b)" : "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))", 
        color: "white", padding: "10px 20px", margin:"5px" }}>
        Confirm
      </Button>
      </DialogActions>
    </Dialog>);
}

export const AddressDialog = (props:any) => {
    var needAskLocation;
    // Find out whether or not we should ask the user for input. If we're overriding whatever the natural outcome would be,
    //  just ask them no matter what.
    if (props.forceAsk === false || props.forceAsk === undefined)
        needAskLocation = localStorage.getItem("doesNotStoreAddress") === "true" ?
            false :
            (typeof localStorage.getItem("requestFrom") === 'undefined' || 
            localStorage.getItem("requestFrom") === null);
    else
        needAskLocation = true;

    // Actually save the user-entered value into localStorage.
    const finalizeTextFieldValue = () => {
        if (errorState) {
          alert("You can't save this address. Please enter a valid street address");
        }
        else {
          setOpen(false);
          localStorage.setItem("requestFrom", JSON.stringify(address));
          localStorage.setItem("doesNotStoreAddress", "false");
          //axios.post(`${APIURL}/locations`,
          //  {
          //    address: `${address.street_number} ${address.street}`,
          //    city: address.city,
          //    state: address.state,
          //    postal: parseInt(address.postal),
          //    country: address.country,
          //    deliveries: {},
          //    requestLocations: {}
          //  },
          //).then((data) => {
          //  console.log(data);
          //})
        }
    }

    // This is for deciding if the dialog should be open or not
    const [open, setOpen] = useState(needAskLocation);

    // Do this if the user decides to skip entering the address of their food pantry.
    const skipGettingAddress = () => {
        localStorage.setItem("doesNotStoreAddress", "true");
        setOpen(false);
    }

    const processAddress = (addr: AddressType, isValid: boolean) => {
      if (!isValid) {
        alert("Please select a valid building street address.");
        setErrorState(true);
      }
      else {
        setErrorState(false);
        setAddress(addr);
      }
    }

    const [address, setAddress] = useState({} as any);
    const [errorState, setErrorState] = useState(true);

    return (
        <Dialog open={open}>
          <DialogTitle>Where are you requesting from?</DialogTitle>
          <DialogContent>
            <MapsAutoComplete giveMeTheAddress={(selected:any, isValid: boolean) => {processAddress(selected, isValid);}}/>
          </DialogContent>
          <DialogActions>
            <Button
              color="success"
              variant="contained"
              onClick={finalizeTextFieldValue}
            >
              Save
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={skipGettingAddress}
            >
              Skip this step
            </Button>
          </DialogActions>
        </Dialog>);
  }
