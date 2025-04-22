import { Box, Typography, Dialog, DialogActions, Button } from "@mui/material";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { PatronItem } from "./patron-helpers/patron-item";
import { Produce } from "../../models/produce.model";
import PatronCart from "./patron-helpers/patron-cart";
import { PFButton } from "../../components/designs/custom-button";
import { MapsAutoComplete, AddressType } from "../../components/maps";
import Spinner from "../../components/designs/spinner";
import { setNumPeople } from "../../state/slices/request-info-slice";
import edit from "../../images/icons/editBlack.svg";
import { BaseProducePage } from "../../components/layout/base-produce-page";
import { miniReqArr } from "models/mini-req.model";

export const PatronProduce = () => {

  const numPeople: number = useAppSelector((state: any) => state.requestInfo.numPeople);

  const tempNumPeople = useRef(numPeople);
  const [numPeopleDialogOpen, setNumPeopleDialogOpen] = useState(true);

  const [location, setLocation] = useState({} as AddressType);

  const dispatch = useAppDispatch();

  return (
    <Box>
      <BaseProducePage
        pageTitle="Request Produce"
        extraComponents={[(
          <Box sx={{ display: "flex", flexDirection: "row", height: "20%", marginTop: "20px", marginX: "15px", alignItems: "center" }}>
            <Typography sx={{ marginX: "10px", width: "70%", textAlign: "right" }}>
              Household Size: {numPeople}
            </Typography>
            <Button variant="text" onClick={() => {
              setNumPeopleDialogOpen(true);
              tempNumPeople.current = numPeople;
            }}>
              <img width="24px" height="24px" src={edit} alt="edit" />
            </Button>
          </Box>
        ), (
          <Box sx={{ display: "flex", flexDirection: "row", height: "30%", marginTop: "15px" }}>
            <Typography sx={{ marginX: "20px", width: "30%", textAlign: "right" }}>Foodbank Location</Typography>
            <MapsAutoComplete giveMeTheAddress={(addr: any) => { setLocation(addr) }} />
          </Box>
        )]}
        filterMethods={{
          filterTypes: [
            {name: "All", key: "", value: ""},
            {name: "Fruit", key: "type", value: "Fruit"},
            {name: "Root", key: "type", value: "Root"},
            {name: "Vegetable", key: "type", value: "Vegetable"}
        ]}}
        produceItem={(produce: Produce) => <PatronItem produce={produce} />}
        produceCart={(reqList: miniReqArr, onClose: () => void) =>
          <PatronCart reqs={reqList} onClose={onClose} location={location} />
        }
        cartListString={"requestInfo.reqList"}
      />
      <Dialog
        open={numPeopleDialogOpen}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 6,
            paddingBottom: 1,
          }}
        >
          <Typography variant="h5" fontWeight="300" sx={{ marginBottom: 3 }}>
            How many people do you want to feed?
          </Typography>
          <Spinner
            value={tempNumPeople}
            minValue={0}
            maxValue={999}
          />
        </Box>
        <DialogActions>
          <PFButton
            text="Confirm"
            onClick={() => {
              dispatch(setNumPeople({ numPeople: Number(tempNumPeople.current) }));
              setNumPeopleDialogOpen(false);
            }}
          />
          <PFButton
            text="Cancel"
            secondary={true}
            onClick={() => {
              setNumPeopleDialogOpen(false);
            }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};
