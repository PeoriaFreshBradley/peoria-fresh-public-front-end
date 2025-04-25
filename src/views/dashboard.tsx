import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton, ListItem, List, ListItemButton, ListItemSecondaryAction, Dialog, DialogActions, Alert, Button } from '@mui/material'; 
import { useAppDispatch, useAppSelector } from '../state/hooks';
import AddIcon from '../images/icons/add.svg';
import redX from '../images/icons/redX.svg'
import DashboardBackground from '../images/dashboard-background.svg';
import { BaseCard } from 'components/designs/base-card';
import { GrowBtn, HarvestBtn, PFButton } from 'components/designs/custom-button';
import { AddressType, MapsAutoComplete, toShortAddress } from 'components/maps';
import { useNavigate } from 'react-router-dom';
import APIURL from 'APIURL';
import { setAccepted, setPlanted } from 'state/slices/growing-slice';
import { addLocation, removeLocation, setLocations } from 'state/slices/maps/autocomplete';
import { LocGrowParam, addGrowingToLoc, removeDeliveryLocation, removeGrowingOnLoc, resetWhatGoesWhere } from 'state/slices/maps/delivery-where';
import { instance as axios } from "axios-instance";
import { Growing } from '../models/growing.model';
import Add from "@mui/icons-material/Add";
import MinusIcon from '@mui/icons-material/Remove';
import PlaceIcon from '@mui/icons-material/Place';
import Spinner from 'components/designs/spinner';
import { error } from 'console';

  /**
   * The set difference operation on a & b. 
   * @returns A new set of type T with the result of a-b.
   * @param a of type T
   * @param b of type T
   */
  export function difference<T> (a: Set<T>, b: Set<T>): Set<T> {
    let out = new Set<T>();
    for (let i of a) {
      if (!b.has(i)) {
        out.add(i);
      }
    }
    return out;
  }

  /**
   * The set union operation on a & b. 
   * @returns A new set of type T with the result of a U b.
   * @param a of type T
   * @param b of type T
   */
  export function union<T> (a: Set<T>, b: Set<T>): Set<T> {
    let out = new Set<T>();
    for (let i of a) {
      out.add(i);
    }
    for (let i of b) {
      out.add(i);
    }
    return out;
  }

export interface GrowingWithYield {
  growing: Growing;
  yield: number; // stored in ounces
  displayInPounds: boolean;
}

const DashboardPage = () => {
  const userInfo = useAppSelector((state: any) => state.userInfo);
  const dispatch = useAppDispatch();
  const gardenerId = useAppSelector((state: any) => state.userInfo.userObj.gardenerProfile.id);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [showYieldPopup, setShowYieldPopup] = useState(false);
  const [successfullyHarvested, setSuccessfullyHarvested] = useState(false);
  const [error, setError] = useState("");

  const [currentlyEditing, setCurrentlyEditing] = useState({} as AddressType);
  const [locDialogIsOpen, setLocDialogIsOpen] = useState(false);
  const [viewingLocations, setViewingLocations] = useState<Array<AddressType> | null>(null);
  const locations = useAppSelector((state: any) => state.locationsList.locations);
  const whatGoesWhere = useAppSelector((state: any) => state.deliveryLocsList.whatGoesWhere);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  const [disabledGrow, setDisabledGrow] = useState(true);
  const [disabledHarvest, setDisabledHarvest] = useState(true);
  const [selectedToGrow, setSelectedToGrow] = useState(new Set<Growing>());
  const [selectedToHarvest, setSelectedToHarvest] = useState(useRef(new Set<Growing>()))

  const togglePopup = () => {
    beginHarvest();
    setShowYieldPopup(!showPopup);
    setDisabledHarvest(!disabledHarvest);
  }

  const commReqRedirect = () => {
    navigate("/garden/produce");
  }

  (function() {
    let root = document.getElementById("root");
    if (root !== null) { 
      root.style.overflow = "auto";
    }
  })();

  const planted = useAppSelector((state: any) => state.growingList.planted);
  const getPlanted = useCallback(async () => {
    const res = await axios.get(`${APIURL}/growing`, {
      params: {
        status: "planted",
        limit: -1,
        includeExtra: true
      },
    });
    if (res.status === 200) {
      dispatch(setPlanted(res.data.data));
    } else {
      setError("An internal error occured while fetching your growing produce. Please refresh your browser.");
    }
  }, [dispatch]);

  useEffect(() => {
    getPlanted();
  }, [getPlanted]);

  const getAccepted = useCallback(async () => {
    const res = await axios.get(`${APIURL}/growing`, {
      params: {
        status: "accepted",
        limit: -1,
        includeExtra: true
      },
    });
    if (res.status === 200) {
      dispatch(setAccepted(res.data.data));
    } else {
      setError("An internal error occured while fetching your accepted produce. Please refresh your browser.");
    }
  }, [dispatch]);

  useEffect(() => {
    getAccepted();
  }, [getAccepted]);

  const accepted = useAppSelector((state: any) => state.growingList.accepted);

    const onAcceptedSelection = (selected: boolean, g: Growing) => {
    let temp = selectedToGrow;

    if (selected) {
      temp.add(g);
      setSelectedToGrow(temp);
    }else{ 
      temp.delete(g)
      setSelectedToGrow(temp);
    }
    setDisabledGrow(selectedToGrow.size === 0);
  };

  const moveToGrowing = async () => {
    let altered = new Set<Growing>(accepted);
    let Planted = Array.from(union(planted, selectedToGrow));
    dispatch(setAccepted(Array.from(difference(altered, selectedToGrow))));
    dispatch(setPlanted(Planted));

    selectedToGrow.clear();
    setDisabledGrow(selectedToGrow.size === 0);
    try {
      for (const id of Planted) {
        const res = await axios.patch(`${APIURL}/growing/${id.id}`, { 
          status: "planted" });
      }
    } catch (error) {
      console.error(error);
      setError("An internal error occured while moving your accepted produce to growing. Please refresh your browser.");
    }
  };
  
  

  const cancelAccepted = async (g : Growing) => {
    try {
      const res = await axios.delete(`${APIURL}/growing/${g.id}`);
        let altered = new Set<Growing>(accepted);
        let altered2 = new Set<Growing>([g]);
        dispatch(setAccepted(Array.from(difference(altered,altered2))));
    
        setDisabledGrow(selectedToGrow.size === 0);
    } catch (error) {
      console.error(error);
      setError("An internal error occured in removing the produce from your accepted list. Please refresh your browser.")
    }
    } 

    const cancelGrowing = async (g: Growing) => {
      try {
        const res = await axios.patch(`${APIURL}/growing/${g.id}`, { 
          status: "accepted" 
      });
        dispatch(setPlanted(planted.filter((item: Growing) => item.id !== g.id)));
        dispatch(setAccepted([...accepted, g]));
        
        setDisabledHarvest(selectedToHarvest.current.size === 0);
      } catch (error) {
          console.error(error);
          setError("An internal error occured in removing the produce from the growing list. Please refresh your browser.")
      }
  };


  const markAsPlanted = async (growing : Growing) => {
    const res = await axios.patch(`${APIURL}/growing/${growing.id}`);
    }
  

  const onPlantedSelection = (selected: boolean, g: Growing) => {
    let temp = selectedToHarvest;

    if (selected) {
      temp.current.add(g)
      setSelectedToHarvest(temp);
    }else{ 
      temp.current.delete(g);
      setSelectedToHarvest(temp);
    }
    setDisabledHarvest(selectedToHarvest.current.size === 0);
  };

  const [harvesting, setHarvesting] = useState(new Array<Growing>());

  const beginHarvest = () => {
    //let altered = new Set<Growing>(planted);
    let tmpHarvesting = new Set<Growing>(harvesting);
    //dispatch(setPlanted(Array.from(difference(altered, selectedToHarvest))));
    setHarvesting(Array.from(union(tmpHarvesting, selectedToHarvest.current)));
    let tmp = yieldList;
    for (let i of selectedToHarvest.current) {
      tmp.add({
        growing: i,
        yield: i.amount,
        displayInPounds: true
      } as GrowingWithYield);
    }
    setYieldList(tmp);
  };

  const cancelPopup = () => {
    setCurrentlyEditing({} as AddressType);
    dispatch(setLocations("[]"));
    dispatch(resetWhatGoesWhere());
    setShowPopup(false);
    setShowYieldPopup(false);
    setYieldList(new Set<GrowingWithYield>());
    setDeliveryDate(null);
    setDisabledHarvest(false);
  }

  const addrIsNull = (a:AddressType):boolean => {
    return (JSON.stringify(a) === '{}');
  }

  // for edit item dialog
  const [editingGrowing, setEditingGrowing] = useState<GrowingWithYield | null>(null);
  const editingDialogDummyValue = useRef(0);
  const [editingDialogUnitIndex, setEditingDialogUnitIndex] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [yieldList, setYieldList] = useState(new Set<GrowingWithYield>());
  const openEditDialog = (gro: GrowingWithYield) => {
    setEditDialogOpen(true);
    setEditingGrowing(gro);
    editingDialogDummyValue.current = gro.displayInPounds ? gro.yield / 16 : gro.yield;
    setEditingDialogUnitIndex(gro.displayInPounds ? 1 : 0);
  }
  
  const editItem = (gro: GrowingWithYield, newAmount: number, displayInPounds: boolean) => {
    let tmp = yieldList;
    for (let i of tmp) {
      if (gro.growing.id === i.growing.id) {
        i.yield = (displayInPounds ? newAmount * 16 : newAmount);
        i.displayInPounds = displayInPounds;
      }
    }
    setYieldList(tmp);
  }

  const removeItem = (gro: GrowingWithYield) => {
    let tmp = Array.from(yieldList);
    const currentIndex = tmp.findIndex((r: GrowingWithYield) => r.growing.id === gro.growing.id);
    tmp.splice(currentIndex, 1);
    setYieldList(new Set<GrowingWithYield>(tmp));
  }

  const advanceToLocations = () => {
    let mapped = new Map<number, Growing>();
    for (let i of harvesting) {
      mapped.set(i.id, i);
    }
    yieldList.forEach((gro: GrowingWithYield) => {
      let tmp = mapped.get(gro.growing.id);
      if (tmp !== undefined) {
        mapped.set(
          gro.growing.id,
          {...gro.growing, amount: gro.displayInPounds ? gro.yield : gro.yield / 16 } as Growing
        );
      }
    });
    setShowYieldPopup(false);
    setShowPopup(true);
  }

  //Visibility Button - This string says whether the user is public or private: `${userInfo.userObj.gardenerProfile.visibility}`
  const [visibility, setVisibility] = useState(`${userInfo.userObj.gardenerProfile.visibility}`);
  const [visibleText, setVisibleText] = useState(`Toggle Visibility`); //This line is SUPPOSED to read what you are to set the default button. Unfortunately, it always returns "private" even when the user is public. idk why.
  
  const handleToggle = async () => {
    setVisibility((prev) => {
      const newVisibility = prev === "public" ? "private" : "public";
      setVisibleText(newVisibility === "public" ? "You are public" : "You are private");

      //API Call to make the change in the backend
      axios.patch(`${APIURL}/gardeners/${userInfo.userObj.gardenerProfile.id}`, 
        {
        visibility: newVisibility, // Send updated visibility status
        });

      return newVisibility;
    });  
  }

  return (
    <Grid container spacing={2} sx={{ padding: '1%', width: "100%" }} columnSpacing={10}>
    { error.length > 0 && (
      <Box position={"relative"} height="100%" width="100%" sx={{display:"flex", justifyContent:"center", marginLeft: 8}}>
        <Box position={"absolute"}>
          <Alert severity='error' onClose={() => {setError("")}}>{error}</Alert>
        </Box>
      </Box>
    )} 

      {/* Welcome grid */}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", color: "var(--base_site_MTColorDark, #202d2b)" }}>
        <h1>Welcome, {userInfo.userObj.gardenerProfile.name !== "" ? userInfo.userObj.gardenerProfile.name : "Gardener"}</h1>
      </Grid>

      {/* Leaderboard button and text */}
      <Grid item xs={12} md={12} lg={12} sx={{mt: -3, mb:-.5, display: "flex", justifyContent: "flex-start", alignItems: "center", color: "var(--base_site_MTColorDark, #202d2b)" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, marginBottom: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight:1, fontSize: { xs: '14px', sm: '18px', lg: '24px' } }}>
            Leaderboard Opt-In/Out:
          </Typography>
          <PFButton text="Opt-In/Out" onClick={() => navigate("/garden/opt-in-game")}/>
        </Box>
      </Grid>

      {/* Leaderboard button and text */}
      <Grid item xs={12} md={12} lg={12} sx={{mt: -3, mb:-.5, display: "flex", justifyContent: "flex-start", alignItems: "center", color: "var(--base_site_MTColorDark, #202d2b)" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: 13.35, fontSize: { xs: '14px', sm: '18px', lg: '24px' } }}>To Leaderboard:</Typography>
            <PFButton text="Leaderboard" onClick={() => navigate("/garden/leaderboard")}/>
          </Box>
        </Grid>

      {/* Leaderboard visibility button and text */}
      <Grid item xs={12} md={12} lg={12} sx={{mt: -3, mb:-.5, display: "flex", justifyContent: "flex-start", alignItems: "center", color: "var(--base_site_MTColorDark, #202d2b)" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: 4.25, fontSize: { xs: '14px', sm: '18px', lg: '24px' } }}>Leaderboard Visibility:</Typography>
            <Button onClick={handleToggle}
              sx={{
                borderRadius: "1.5625rem",
                backgroundColor: (visibility === "public") ? "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" : "var(--base_site_destructiveButtonHoverColor, #d35c4c)",
                "&:hover": {backgroundColor: (visibility === "public") ? "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" : "var(--base_site_destructiveButtonHoverColor, #d35c4c)",
                },
              }}>
              {visibleText}
            </Button>
          </Box>
        </Grid>

      {/* Badges button and text */}
      <Grid item xs={12} md={12} lg={12} sx={{mt: -3, mb:-.5, display: "flex", justifyContent: "flex-start", alignItems: "center", color: "var(--base_site_MTColorDark, #202d2b)" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: 16, fontSize: { xs: '14px', sm: '18px', lg: '24px' } }}>To Badges Page:</Typography>
            <PFButton text="Badges" onClick={() => navigate("/garden/badges")}/>
          </Box>
        </Grid>        

      {/* Green box grid */}
      <Grid item container xs={2} md={2} lg={2.5} sx={{ position: 'relative', height: '100%' }}>
      
        {/* Plant/button grid */}
        <Grid item xs={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", color: "var(--base_site_MTColorDark, #202d2b)" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: 2, fontSize: { xs: '14px', sm: '18px', lg: '24px' } }}>To Plant</Typography>
            <GrowBtn onClick={moveToGrowing}/>
          </Box>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{
            elevation: 6, borderRadius: '8px', border: '1px dashed', borderColor: 'white', backgroundColor: '#50603B', display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            height: "100%", 
            padding: 2,
            positon: 'relative',
            minHeight: 0
          }}>
            <IconButton onClick={commReqRedirect} sx={{ width: { xs: '35px', sm: '40px', md: '50px', lg: '55px' }, height: { xs: '35px', sm: '40px', md: '50px', lg: '55px' } }}>
              <img src={AddIcon} alt="Add Icon" style={{ width: '100%', height: '100%' }} />
            </IconButton>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white', fontSize: { xs: '10px', sm: '14px', md: '18px', lg: '20px', textAlign: 'center'} }}>VIEW REQUESTS</Typography>
            <Typography variant="body1" sx={{ color: 'white', mt: 0, fontSize: { xs: '8px', sm: '10px', lg: '14px', maxWidth: '100%' }}}>Add to garden</Typography>
          </Paper>
        </Grid>

        <Grid item container sx={{ overflowY: "auto", maxHeight: "75vh" }} xs={12} md={12} lg={12}>
          {
              accepted.map((i:Growing) => {
                let j = i.produce;


              return <Grid item xs={12} md={12} lg={12} sx={{marginTop: "5px"}} key={i.id}>
            
            <BaseCard
              name={j.name} 
              smallPhotoURL={j.smallPhotoURL} 
              variant={'dashboard'} 
              selectable 
              onSelect={(selected:boolean) => {onAcceptedSelection(selected, i);}}
              remove
              onRemove={() => cancelAccepted(i)}
              details={[
                {
                  key: "Accepted",
                  value: `${i.amount/16} lbs`
                }
            ]}
            />

          </Grid>
              })
            }
        </Grid>

      </Grid>

      {/* DashboardBackground grid */}
      <Grid item xs={10} md={10} lg={9.5}>
        <Grid container>
          <Grid item xs={12} md={12} lg={12} sx={{paddingBottom: "1%"}}>
            {/* Harvest button */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: 2, fontSize: { xs: '14px', sm: '18px', lg: '24px' }}}>Growing</Typography>
              <HarvestBtn disabled={disabledHarvest} onClick={togglePopup}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, }}>
              <Typography variant="h5" sx={{fontWeight: 'bold', marginRight: 2, fontSize: { xs: '14px', sm: '18px', lg: '24px' }, '& a': {color: "var(--base_site_MTColorDark, #202d2b)" }, '& a:visited': { color: "var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))" }, '& a:hover': { textDecoration: 'underline'} }}>
                <a href="https://drive.google.com/file/d/1cD7YrZlpKLvabwniCTN1BF1ruh5OhJsc/view">
                  Receipt For Harvest Validation
                </a>
              </Typography>
              </Box>
          </Grid>  
          <Grid item xs={12} md={12} lg={12} sx={{ 
              width: "90%", 
              height: "90vh", 
              position: 'relative', 
              background: `url(${DashboardBackground})`, 
              backgroundSize: "contain",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top',
            }}>

            <Grid container spacing={2} sx={{ width: "95%", margin: "10px", overflowY: "auto", maxHeight: "95%" }}>
                {
                  planted.map((i:Growing) => {
                    let j = i.produce;
                    return <Grid item xs={3} md={3} lg={3} sx={{marginTop: "5px"}} key={i.id}>
                      <BaseCard 
                        name={j.name} 
                        smallPhotoURL={j.smallPhotoURL} 
                        variant={'dashboard'} 
                        selectable 
                        onSelect={(selected:boolean) => {onPlantedSelection(selected, i);}}
                        remove
                        onRemove={() => cancelGrowing(i)}
                        details={[
                          {
                            key: "Growing",
                            value: `${i.amount/16} lbs`
                          }
                        ]}
                      />
                    </Grid>
                  })
                }
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Date and yield popup */}
      {showYieldPopup && (
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
            maxWidth: 900, 
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
              <Grid item xs={12} sm={6} sx={{maxHeight:"67vh", overflowY:"auto"}}>
                <List>
                  <ListItem>Your Donations:</ListItem>
                </List>
                {
                <List>
                  {
                    Array.from(yieldList).map((i:GrowingWithYield) => {
                      return <ListItem
                          sx={{mt: "10px",}}
                          divider
                          secondaryAction={
                            <PFButton text="Edit"
                              onClick={() => {
                                openEditDialog(i);
                              }}
                            />
                          }
                        >
                          {i.growing.produce.name}: {(i.displayInPounds ? i.yield / 16 : i.yield)} { i.displayInPounds ? "lbs" : "oz" }
                        </ListItem>;
                    })
                  }
                </List>
                }
              </Grid>
              <Grid item xs={12} sm={6} sx={{maxHeight:"67vh", overflowY:"auto"}}>
                <List>
                  <ListItem>When can you deliver your harvest?</ListItem>
                </List>
                <List>
                  <ListItem divider>
                    <input type="date"
                      onInput={(e) => {
                        let tmp = e.target as HTMLInputElement;
                        setDeliveryDate(tmp.valueAsDate);
                      }}
                    />
                  </ListItem>
                  <ListItem divider>
                    Please estimate when you'll be able to deliver this produce to the food pantries. This is an approximate date, plus or minus a week where you'll be able to deliver.
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" sx={{position: 'relative', bottom: '0px'}}>
              <PFButton text='Cancel' baseColor='var(--base_site_destructiveButtonColor, #a44433)' hoverColor='var(--base_site_destructiveButtonHoverColor, #d35c4c)' onClick={cancelPopup} sx={{ mr: "10px" }}/>
              <PFButton 
                text='Next'
                onClick={advanceToLocations}
                disabled={ deliveryDate === null || yieldList.size === 0 }
              />
            </Grid>
          </Box>
        </Box>
        )}

      <Dialog //dialog for edit request
        open={editDialogOpen}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 6,
            paddingBottom: 1
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
              if(editingDialogDummyValue.current === 0 && editingGrowing) removeItem(editingGrowing)
              else if(editingGrowing) editItem(editingGrowing, editingDialogDummyValue.current, editingDialogUnitIndex === 1)
              setEditingGrowing(null)
              setEditDialogOpen(false)
            }}
          />
          <PFButton
            text="Cancel"
            secondary={true}
            onClick={() => {
              setEditingGrowing(null)
              setEditDialogOpen(false)
            }}
          />
        </DialogActions>
      </Dialog>
      
      {/** Successfully Delivered Produce */}
      <Dialog
        open={successfullyHarvested}
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
              <img width="30px" height="30px" style={{cursor:"pointer"}} src={redX} alt="Remove" onClick={() => {setSuccessfullyHarvested(false)}}></img>
            </Box>
          </Box>
          <Typography variant="h3" sx={{ color: "var(--base_site_success, green)", fontWeight: "700" }}>
            Success!
          </Typography>
          <Typography variant="h6">
            <strong>Produce is ready to be delivered</strong>
          </Typography>
        </Box>
      </Dialog>

      {/** What goes where pop-up */}
      {showPopup && (
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
                <MapsAutoComplete clearOnValid giveMeTheAddress={(selected:any, isValid:boolean) => { dispatch(addLocation(selected)); }}/>
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
                                  let addBackIn = yieldList;
                                  for (let i of chosenGrowings) {
                                    addBackIn.add(i);
                                  }
                                  setYieldList(addBackIn);
                                  dispatch(removeDeliveryLocation(addr));
                                }
                                if (JSON.stringify(currentlyEditing) === JSON.stringify(addr)) {
                                  setCurrentlyEditing({} as AddressType);
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
                  >{ addrIsNull(currentlyEditing) ?
                     "No Location Selected"
                  : 
                    toShortAddress(currentlyEditing)
                  }</ListItem>
                </List>
                {
                <List>
                    { whatGoesWhere[JSON.stringify(currentlyEditing)] !== undefined && 
                      whatGoesWhere[JSON.stringify(currentlyEditing)].map((i:GrowingWithYield) => {
                      return <ListItem
                          divider
                          key={i.growing.id}
                          secondaryAction={
                            <IconButton edge="end" onClick={
                                () => {
                                  if (!addrIsNull(currentlyEditing)) {
                                    dispatch(removeGrowingOnLoc({
                                      growing: i,
                                      location: currentlyEditing
                                    } as LocGrowParam));
                                    let tmp = yieldList;
                                    tmp.add(i);
                                    setYieldList(tmp);
                                  }
                                }
                              }>
                              <MinusIcon />
                            </IconButton>
                          }
                      >{i.growing.produce.name} ({i.yield/16} lbs)</ListItem>
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
                          if (!addrIsNull(currentlyEditing)) {
                            yieldList.forEach((i:GrowingWithYield) => {
                              dispatch(addGrowingToLoc({
                                growing: i,
                                location: currentlyEditing
                              } as LocGrowParam));
                              setYieldList(new Set<GrowingWithYield>());
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
                      Array.from(yieldList).map((i:GrowingWithYield) => {
                       const hasLocations = i.growing.extra.requestingLocations !== undefined && i.growing.extra.requestingLocations.length > 0;
                        let locs:any[];
                        if (hasLocations) locs = i.growing.extra.requestingLocations;
                        return <ListItem
                            divider
                            secondaryAction={
                              <IconButton edge="end" onClick={
                                  () => {
                                    if (!addrIsNull(currentlyEditing)) {
                                      dispatch(addGrowingToLoc({
                                        growing: i,
                                        location: currentlyEditing
                                      } as LocGrowParam));
                                      let tmp = yieldList;
                                      tmp.delete(i);
                                      setYieldList(tmp);
                                    }
                                  }
                                }>
                                <Add />
                              </IconButton>
                            }
                        >{i.growing.produce.name} ({i.yield/16} lbs) 
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
            <Grid container justifyContent="flex-end" sx={{position: 'relative', bottom: '0px'}}>
              <PFButton text='Cancel' baseColor='var(--base_site_destructiveButtonColor, #a44433)' hoverColor='var(--base_site_destructiveButtonHoverColor, #d35c4c)' onClick={cancelPopup} sx={{mr: "10px"}}/>
              <PFButton 
                text='Finish'
                disabled={yieldList.size !== 0 || harvesting.length === 0}
                onClick={
                  () => {
                    let growingsDelivered = new Set<Growing>();
                    for (let i of Object.keys(whatGoesWhere)) {
                      let loc = JSON.parse(i) as AddressType;
                      let growings = whatGoesWhere[i] as Array<GrowingWithYield>;

                      for (let gro of growings) {
                        selectedToHarvest.current.delete(gro.growing);
                        growingsDelivered.add(gro.growing);
                        axios.patch(`${APIURL}/growing/${gro.growing.id}`, {
                          status: 'harvested',
                          toDelivery: {
                            expectedDeliveryDate: deliveryDate,
                            address: `${loc.address}`,
                            city: loc.city,
                            state: loc.state,
                            zip: loc.postal,
                            country: loc.country,
                            amountHarvested: gro.yield
                          }
                        });
                      }
                    }
                    let altered = new Set<Growing>(planted);
                    dispatch(setPlanted(Array.from(difference(altered, growingsDelivered))));
                    selectedToHarvest.current.clear();
                    setDisabledHarvest(selectedToHarvest.current.size === 0);

                    cancelPopup();
                    setSuccessfullyHarvested(true);
                  }
                }
              />
            </Grid>
          </Box>
        </Box>
        )}
    </Grid>
  );
};

export default DashboardPage;
