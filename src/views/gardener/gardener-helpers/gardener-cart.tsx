import { Box, Button, List, ListItem, Typography, Dialog, DialogActions, Grid, IconButton, ListItemButton, ListItemSecondaryAction } from "@mui/material";
import Spinner from "../../../components/designs/spinner";
import { miniReq, miniReqArr } from "../../../models/mini-req.model";
import { instance as axios } from "axios-instance";
import APIURL from "../../../APIURL";
import { useAppSelector } from "../../../state/hooks";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccepting } from "../../../state/slices/accepting-info-slice";
import { PFButton, PFListButton } from "components/designs/custom-button";
import caretUp from "../../../images/icons/caretUp.svg";
import redX from "../../../images/icons/redX.svg";
import edit from "../../../images/icons/editBlack.svg";
import { AddressType, MapsAutoComplete, toShortAddress } from "components/maps";
import MinusIcon from '@mui/icons-material/Remove';
import { Add } from "@mui/icons-material";
import { addLocation, removeLocation, setLocations } from "state/slices/maps/autocomplete";
import { removeDeliveryLocation, addRequestToLoc, removeRequestOnLoc, LocReqParam, resetWhatGoesWhere } from "state/slices/maps/donation-delivery";
import PlaceIcon from '@mui/icons-material/Place';

interface GardenerCartProps {
  reqs: miniReqArr;
  onClose?: () => void;
}

const GardenerCart = (props: GardenerCartProps) => {
  
  const userInfo = useAppSelector((state: any) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for dialogs
  const [addedToGardenDialogOpen, setAddedToGardenDialogOpen] = useState(false);
  const [donatingDialogOpen, setDonatingDialogOpen] = useState(false);
  const [donatedDialogOpen, setDonatedDialogOpen] = useState(false);
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
    const newAccepting = JSON.parse(JSON.stringify(props.reqs));
    const indexOfReq = newAccepting.findIndex(
      (r: miniReq) => r.id === req.id
    );
    newAccepting[indexOfReq] = {name: req.name, id: req.id, amt: displayInPounds ? amount * 16 : amount, displayInPounds: displayInPounds};
    dispatch(setAccepting({ reqList: newAccepting }));
  };

  // remove an item from the req list
  const removeItem = (req: miniReq) => {
    const reqs = JSON.parse(JSON.stringify(props.reqs));
    const currentIndex = reqs.findIndex((r: miniReq) => r.id === req.id);
    reqs.splice(currentIndex, 1);
    dispatch(setAccepting({ reqList: reqs }));
  }

  // submit all items from cart
  const submitRequests = (addingToGarden: boolean) => {
    let noErrors = true;
    props.reqs.forEach(async (req: miniReq) => {

      // adds items to growing table in database
      if (addingToGarden) {
        const res = await axios.post(`${APIURL}/growing`, {
          produce: {id: req.id },
          gardener: {id: userInfo.userObj.gardenerProfile.id},
          status: "accepted",
          amount: +req.amt
        });
        if (res.status !== 201) noErrors = false;
      }

    });
    
    // decide which dialog to open
    if (noErrors && addingToGarden)
      setAddedToGardenDialogOpen(true);
    else if (noErrors)
      setDonatingDialogOpen(true);
    else
      setThereWasAProblemDialogOpen(true);
  };

  const [currentlyEditing, setCurrentlyEditing] = useState<AddressType | null>(null);
  const [locDialogIsOpen, setLocDialogIsOpen] = useState(false);
  const [viewingLocations, setViewingLocations] = useState<Array<AddressType> | null>(null);
  const locations = useAppSelector((state: any) => state.locationsList.locations);
  const whatGoesWhere = useAppSelector((state: any) => state.donationLocsList.whatGoesWhere);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [donating, setDonating] = useState<Set<miniReq>>(new Set<miniReq>());


  function cancelPopup() {
    setDonating(new Set<miniReq>(props.reqs));
    setDonatingDialogOpen(false);
    dispatch(setLocations("[]"));
    dispatch(resetWhatGoesWhere());
    setCurrentlyEditing(null);
  }

  return (
    <Box
      sx={[
        {
          height: "100%",
          display: "flex",
          flexDirection: "column",
          //alignItems: "center",
          //justifyContent: "space-between",
          backgroundColor: "var(--base_site_MTColorLight, #fffbf8)",
          //overflowY: "auto",
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
            dispatch(setAccepting({ reqList: [] }));
          }}
        />
        <PFButton
          text="Donate Now"
          onClick={() => {
            submitRequests(false);
            setDonating(new Set<miniReq>(props.reqs));
          }}
        />
        <PFButton
          text="Add to Garden"
          onClick={() => {
            submitRequests(true);
          }}
        />
      </Box>


      {/*Dialogs*/}
      <Dialog //dialog for add to garden
        open={addedToGardenDialogOpen}
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
              <img width="30px" height="30px" style={{cursor:"pointer"}} src={redX} alt="Remove" onClick={() => {
                setAddedToGardenDialogOpen(false);
                dispatch(setAccepting({ reqList: [] }));
                navigate("/garden/dashboard");
              }}></img>
            </Box>
          </Box>
          <Typography variant="h3" sx={{ color: "var(--base_site_success, green)", fontWeight: "700" }}>
            Success!
          </Typography>
          <Typography variant="h6">
            <strong>Produce has been transfered to your dashboard</strong>
          </Typography>
        </Box>
      </Dialog>

      {/*Dialogs*/}
      <Dialog //dialog for donated produce
        open={donatedDialogOpen && !thereWasAProblemDialogOpen}
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
              <img width="30px" height="30px" style={{cursor:"pointer"}} src={redX} alt="Remove" onClick={() => {window.location.reload()}}></img>
            </Box>
          </Box>
          <Typography variant="h3" sx={{ color: "var(--base_site_success, green)", fontWeight: "700" }}>
            Success!
          </Typography>
          <Typography variant="h6">
            <strong>Produce has been marked for delivery! </strong>
          </Typography>
          <Typography variant="h6">
            <strong>Thank you for your donation!</strong>
          </Typography>
        </Box>
      </Dialog>

      {/** What goes where pop-up */}
      <Dialog //dialog for donate now
        open={donatingDialogOpen}
        onClose={() => {
          navigate("/garden/findapantry");
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            //overflow: "auto",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box 
          sx={{ 
            width: '80%', 
            maxWidth: 1200, 
            maxHeight: "72vh", 
            minHeight: '40vh', 
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Grid container spacing={2}>
              {/** Column 1: Locations */}
              <Grid item xs={12} sm={4} sx={{maxHeight: "67vh", overflowY:"auto"}}>
                <MapsAutoComplete clearOnValid giveMeTheAddress={(selected:any, isValid: boolean) => { dispatch(addLocation(selected)); }}/>
                <List>
                  {
                    JSON.parse(locations).map((addr:AddressType) => {
                      return <ListItemButton
                          onClick={
                            () => {
                              setCurrentlyEditing(addr);
                            }
                          }
                          divider
                          key={toShortAddress(addr)}
                        >
                        {toShortAddress(addr)}
                        
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={
                              (e) => {
                                e.stopPropagation();
                                dispatch(removeLocation(addr));
                                let chosenGrowings = whatGoesWhere[JSON.stringify(addr)];
                                if (chosenGrowings !== undefined) {
                                  let addBackIn = new Set<miniReq>(donating);
                                  for (let i of chosenGrowings) {
                                    addBackIn.add(i);
                                  }
                                  setDonating(addBackIn);
                                  dispatch(removeDeliveryLocation(addr));
                                }
                                if (JSON.stringify(currentlyEditing) === JSON.stringify(addr)) {
                                  setCurrentlyEditing(null);
                                }
                              }
                            }>
                              <MinusIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItemButton>
                    })
                  }
                </List>
              </Grid>
              {/* Column 2: Produce to be Delivered */}
              <Grid item xs={12} sm={4} sx={{maxHeight:"67vh", overflowY:"auto"}}>
                <List>
                  <ListItem
                    divider
                  >{ currentlyEditing === null ?
                     "No Location Selected"
                  : 
                    toShortAddress(currentlyEditing)
                  }</ListItem>
                </List>
                {
                <List>
                    { whatGoesWhere[JSON.stringify(currentlyEditing)] !== undefined && 
                      whatGoesWhere[JSON.stringify(currentlyEditing)].map((i:miniReq) => {
                      return <ListItem
                          divider
                          key={i.id}
                          secondaryAction={
                            <IconButton edge="end" onClick={
                                () => {
                                  if (currentlyEditing !== null) {
                                    dispatch(removeRequestOnLoc({
                                      req: i,
                                      location: currentlyEditing
                                    } as LocReqParam));
                                    let tmp = donating;
                                    tmp.add(i);
                                    setDonating(tmp);
                                  }
                                }
                              }>
                              <MinusIcon />
                            </IconButton>
                          }
                      >{i.name} ({i.amt/16} lbs)</ListItem>
                      })
                    }
                </List>
                }
              </Grid>
              {/* Column 3: Ready to be Delivered */}
              <Grid item xs={12} sm={4} sx={{maxHeight:"67vh", overflowY:"auto"}}>
                <List>
                  <ListItem
                    divider
                    secondaryAction={
                      <IconButton edge="end" onClick={
                        () => {
                          if (currentlyEditing !== null) {
                            donating.forEach((i:miniReq) => {
                              dispatch(addRequestToLoc({
                                req: i,
                                location: currentlyEditing
                              } as LocReqParam));
                              setDonating(new Set<miniReq>());
                            });
                          }
                        }
                      }>
                        <Add />
                      </IconButton>
                    }
                  >Add All</ListItem>
                </List>
                <List>
                    {
                      Array.from(donating).map((i:miniReq) => {
                        const hasLocations = i.requestingLocations !== undefined && i.requestingLocations.length > 0;
                        let locs:any[];
                        if (hasLocations && i.requestingLocations !== undefined) locs = i.requestingLocations;
                        return <ListItem
                            divider
                            secondaryAction={
                              <IconButton edge="end" onClick={
                                  () => {
                                    if (currentlyEditing !== null) {
                                      dispatch(addRequestToLoc({
                                        req: i,
                                        location: currentlyEditing
                                      } as LocReqParam));
                                      let tmp = donating;
                                      tmp.delete(i);
                                      console.log(tmp);
                                      setDonating(tmp);
                                    }
                                  }
                                }>
                                <Add />
                              </IconButton>
                            }
                        >{i.name} ({i.amt/16} lbs) 
                          {
                            hasLocations &&
                            <IconButton onClick={() => {
                              setLocDialogIsOpen(true);
                              let newLocArray = new Set<AddressType>();
                              for (let i of locs) {
                                newLocArray.add(i);
                              }
                              setViewingLocations(Array.from(newLocArray));
                            }}>
                              <PlaceIcon/>
                            </IconButton>
                          }
                        </ListItem>
                      })
                    }
                </List>
              </Grid>
            </Grid>
            <Dialog open={locDialogIsOpen}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 6,
                }}
              >
                <Box position="relative" height="100%" width="100%" bottom={10} left={40}>
                  <Box position="absolute" height="100%" width="100%" display="flex" justifyContent="flex-end" alignItems="flex-end">
                    <img height="30px" width="30px" style={{cursor:"pointer"}} src={redX} alt="Remove" onClick={() => {
                      setLocDialogIsOpen(false);
                      setViewingLocations(null);
                    }}></img>
                  </Box>
                </Box>
                <Typography variant="h5">Locations that requested this produce:</Typography>
                <List>
                  {
                    viewingLocations?.map((i: AddressType) => {
                      return <ListItem divider>
                        {`${i.address}, ${i.city}, ${i.state}`}
                      </ListItem>
                    })
                  }
                </List>
              </Box>
            </Dialog>
            <Box justifyContent="flex-end" sx={{position: 'relative', bottom: '0px', display: 'flex'}}>
              <Box sx={{marginRight: 'auto'}}>
                <span style={{marginRight: '4px'}}>Enter your expected delivery date (within a week) here:</span>
                <input type='date'
                  onInput={(e) => {
                    let tmp = e.target as HTMLInputElement;
                    setDeliveryDate(tmp.valueAsDate);
                  }}
                />
              </Box>
              <PFButton text='Cancel' hoverColor="var(--base_site_destructiveButtonHoverColor, #d35c4c)" baseColor="var(--base_site_destructiveButtonColor, #a44433)" onClick={cancelPopup} sx={{mr: "10px"}}/>
              <PFButton 
                text='Finish'
                disabled={donating.size !== 0 || deliveryDate === null}
                onClick={
                  () => {
                    for (let i of Object.keys(whatGoesWhere)) {
                      let loc = JSON.parse(i) as AddressType;
                      let reqs = whatGoesWhere[i] as Array<miniReq>;

                      for (let r of reqs) {
                        axios.post(`${APIURL}/deliveries`, {
                          expectedDeliveryDate: deliveryDate,
                          location: {
                            address: `${loc.address}`,
                            city: loc.city,
                            state: loc.state,
                            postal: loc.postal,
                            country: loc.country,
                          },                          
                          amount: r.amt,
                          produce: {id: r.id}
                        }).catch(() => {
                          setThereWasAProblemDialogOpen(true);
                        });
                        if (thereWasAProblemDialogOpen) break;
                      }
                    }
                    cancelPopup();
                    setDonatedDialogOpen(true);
                  }
                }
              />
            </Box>
          </Box>
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
              <img height="30px" width="30px" style={{cursor: "pointer"}} src={redX} alt="Remove" onClick={() => {setThereWasAProblemDialogOpen(false)}}></img>
            </Box>
          </Box>
          <Typography variant="h3" sx={{color: "var(--base_site_destructiveButtonColor, #a44433)", fontWeight: "700"}}>
            Error!
          </Typography>
          <Typography variant="h6">
            <strong>There was a problem accepting some produce</strong>
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
            unitList={["oz", "lbs"]}
            unitIndex={editingDialogUnitIndex}
            setUnitIndex={setEditingDialogUnitIndex}
            value={editingDialogDummyValue}
            minValue={0}
            maxValue={9999}
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

export default GardenerCart;
