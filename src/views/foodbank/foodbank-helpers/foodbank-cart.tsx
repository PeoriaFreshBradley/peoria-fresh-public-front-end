import { Box, Button, List, ListItem, Typography, Dialog, DialogActions } from "@mui/material";
import Spinner from "../../../components/designs/spinner";
import { miniReq, miniReqArr } from "../../../models/mini-req.model";
import { instance as axios } from "axios-instance";
import APIURL from "../../../APIURL";
import { useAppSelector } from "../../../state/hooks";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setFoodbankReqList } from "../../../state/slices/request-info-slice";
import { PFButton, PFListButton, RequestBtn } from "components/designs/custom-button";
import caretUp from "../../../images/icons/caretUp.svg";
import redX from "../../../images/icons/redX.svg";
import edit from "../../../images/icons/editBlack.svg";
import { AddressType } from "components/maps";

interface FoodbankCartProps {
  reqs: miniReqArr;
  onClose?: () => void;
}

const FoodbankCart = (props: FoodbankCartProps) => {

  const dispatch = useDispatch();

  // for dialogs
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [thereWasAProblemDialogOpen, setThereWasAProblemDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // for edit item dialog
  const [editingReq, setEditingReq] = useState<miniReq | null>(null);
  const editingDialogDummyValue = useRef(0);
  const [editingDialogUnitIndex, setEditingDialogUnitIndex] = useState(1);
  const openEditDialog = (req: miniReq) => {
    setEditDialogOpen(true);
    setEditingReq(req);
    editingDialogDummyValue.current = req.displayInPounds ? req.amt/16 : req.amt;
    setEditingDialogUnitIndex(req.displayInPounds ? 1 : 0);
  }

  // edit a value in the req list
  const editRequest = (req: miniReq, amount: number, displayInPounds: boolean) => {
    const newRequest = JSON.parse(JSON.stringify(props.reqs));
    const indexOfReq = newRequest.findIndex(
      (r: miniReq) => r.id === req.id
    );
    newRequest[indexOfReq] = {name: req.name, id: req.id, amt: displayInPounds ? amount * 16 : amount, displayInPounds: displayInPounds};
    dispatch(setFoodbankReqList({ reqList: newRequest }));
  };

  // remove an item from the req list
  const removeItem = (req: miniReq) => {
    const reqs = JSON.parse(JSON.stringify(props.reqs));
    const currentIndex = reqs.findIndex((r: miniReq) => r.id === req.id);
    reqs.splice(currentIndex, 1);
    dispatch(setFoodbankReqList({ reqList: reqs }));
  }

  // submit all items from cart
  const submitRequests = () => {
    let noErrors = true;
    props.reqs.forEach(async (req: miniReq) => {
        console.log(req);
        // adds items to requests table in database
        const res = await axios.post(`${APIURL}/food-bank-admin/request`, {
            amount: req.amt,
            produce: { id: req.id },
        });
        if (res.status !== 201) noErrors = false;
    });
    if (noErrors)
      setSuccessDialogOpen(true);
    else
      setThereWasAProblemDialogOpen(true);
  };


  return (
    <Box
      sx={[
        {
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--base_site_MTColorLight, #fffbf8)",
        },
        {
          "& .MuiList-root": {
            width: "100%",
          },
        },
      ]}
    >

      {/*Header*/}
      <PFListButton text="Your Produce" iconURL={caretUp} onClick={props.onClose} sx={{width: "100%", borderRadius: "0px", justifyContent: "space-between"}}/>

      <Box sx={{flexGrow: 1, overflowY:"auto"}}>
        {/*List of items in the cart*/}
        <List>
          {props.reqs.map((req: miniReq) => (
            <ListItem key={req.id} style={{ padding: "8px 6px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{display: "flex", justifyContent: "flex-start", alignItems:"center"}}>
                  <Button variant="text" onClick={() => {removeItem(req);}}>
                    <img src={redX} alt="x"/>
                  </Button>
                  <Typography
                    style={{
                      fontSize: `${28 / 1.5}px`,
                      wordBreak: "break-word",
                    }}
                  >
                    {req.name}
                  </Typography>
                </Box>
                <Box sx={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
                  <Typography>
                    {req.displayInPounds ? req.amt / 16 : req.amt} {req.displayInPounds ? (req.amt/16 === 1 ? "lb" : "lbs") : "oz"}
                  </Typography>
                  <Button variant="text" onClick={() => {openEditDialog(req);}}>
                    <img width="24px" height="24px" src={edit} alt="edit"/>
                  </Button>
                </Box>
              </div>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4px"}}>
        <PFButton
          text="Clear List"
          baseColor="var(--base_site_destructiveButtonColor, #a44433)"
          hoverColor="var(--base_site_destructiveButtonHoverColor, #d35c4c)"
          onClick={() => {
            dispatch(setFoodbankReqList({ reqList: [] }));
          }}
        />
        
        <RequestBtn
          onClick={() => {
            submitRequests();
          }}
        />
      </Box>

      {/*Dialogs*/}
      <Dialog //dialog for add to garden
        open={successDialogOpen}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            padding: 6,
          }}
        >
          <Box position="relative" height="100%" width="100%" bottom={10} left={40}>
            <Box position="absolute" height="100%" width="100%" display="flex" justifyContent="flex-end" alignItems="flex-end">
              <img height="30px" width="30px" style={{cursor: "pointer"}} src={redX} alt="Remove" onClick={() => {
                dispatch(setFoodbankReqList({ reqList: [] }));
                setSuccessDialogOpen(false);
              }}></img>
            </Box>
          </Box>
          <Typography variant="h3" sx={{ color: "var(--base_site_success, green)", fontWeight: "700" }}>
            Success!
          </Typography>
          <Typography variant="h6">
            <strong>Your request has been recorded</strong>
          </Typography>
        </Box>
      </Dialog>

    <Dialog //dialog for there was a problem
        open={thereWasAProblemDialogOpen}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            padding: 6,
          }}
        >
          <Box position="relative" height="100%" width="100%" bottom={10} left={40}>
            <Box position="absolute" height="100%" width="100%" display="flex" justifyContent="flex-end" alignItems="flex-end">
              <img height="30px" width="30px" style={{cursor: "pointer"}} src={redX} alt="Remove" onClick={() => {
                setThereWasAProblemDialogOpen(false);
              }}></img>
            </Box>
          </Box>
          <Typography variant="h3" sx={{color: "var(--base_site_destructiveButtonColor, #a44433)", fontWeight:"700"}}>
            Error!
          </Typography>
          <Typography variant="h6">
            <strong>There was a problem requesting some produce</strong>
          </Typography>
        </Box>
      </Dialog>

      <Dialog //dialog for edit request
        open={editDialogOpen}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 6,
            paddingBottom: 1,
          }}
        >
          <Typography variant="h3" fontWeight="600" sx={{marginBottom: 3}}>
            Change amount?
          </Typography>
          <Spinner
            value={editingDialogDummyValue}
            minValue={0}
            maxValue={9999}
            unitList={["oz", "lbs"]}
            unitIndex={editingDialogUnitIndex}
            setUnitIndex={setEditingDialogUnitIndex}
          />
        </Box>
        <DialogActions>
          <PFButton
            text="Confirm" 
            onClick={() => {
              if(editingDialogDummyValue.current === 0 && editingReq) removeItem(editingReq)
              else if(editingReq) editRequest(editingReq, editingDialogDummyValue.current, editingDialogUnitIndex === 1)
              setEditingReq(null)
              setEditDialogOpen(false)
            }}
          />
          <PFButton
            text="Cancel"
            secondary= {true}
            onClick={() => {
              setEditingReq(null)
              setEditDialogOpen(false)
            }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FoodbankCart;


