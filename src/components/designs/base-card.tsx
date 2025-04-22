import { useAppDispatch } from "../../state/hooks";
import { Card, Box, Typography, CardContent, CardMedia, Grid } from "@mui/material";
import checked from '../../images/icons/checked.svg';
import unchecked from '../../images/icons/unchecked.svg';
import redX from "../../images/icons/redX.svg";
import star from '../../images/icons/star.svg';
import { ReactElement, useState, createContext } from "react";

import React from "react";

export type KeyValue = {
    key?: string;
    value: string;
}

type CardInit = {
    smallPhotoURL: string;
    name: string;
    displayBadge?: ReactElement;
    details? : Array<KeyValue>;
    selectable?: boolean;
    remove?: boolean;
    hasStar?: boolean;
    mainElement?: ReactElement;
    actionableElements?: Array<ReactElement>;
    onSelect?: any;
    onRemove?: () => void;
    width?: string;
    height?: string;
    variant?: string;
};

export const BaseCard = ({
    smallPhotoURL,
    name,
    displayBadge,
    details,
    selectable,
    remove,
    hasStar,
    actionableElements,
    onSelect,
    onRemove,
    mainElement,
    width,
    height,
    variant
}:CardInit) => {
  const dispatch = useAppDispatch();
  const [cardIsSelected, setSelected] = useState(false); // keep track of state regarding whether the card is selected or not
  const [cardIsRemoved, setRemoved] = useState(false);

  const removeCard = (e : React.MouseEvent<HTMLImageElement>) => {
    if(!cardIsSelected) {
        // Prevent click event from propagating to the card component
        e.stopPropagation();

        setRemoved(!cardIsRemoved);
        // If a removal callback function is provided by the parent component, call it
        if (typeof onRemove !== 'undefined') {
            onRemove();
        }
    } else {
        setRemoved(!cardIsRemoved);
        if (typeof onRemove !== 'undefined') {
            onRemove();
        }
    }
  }
  
  const context = createContext(false); // set up a Context for the badges (if there are any) to read the selection state

  if (typeof displayBadge !== 'undefined') {
    displayBadge = <> {React.cloneElement(displayBadge, {context:context})} </>; // feed our context into the badge given
  }

  variant = (variant ? variant : 'requests');
  let variantSx = variant === 'requests' ? { width: "28%", height: "16rem" } : { width: "25%", height: "10rem" }

  let badgeSize = (selectable ? 10 : 12); // If we are wanting this to be selectable, the badge grid size has to be smaller to account for the emulated checkbox that appears
  return (
    <context.Provider value={cardIsSelected}>
        <Card 
        onClick={(e:any) => { if (selectable) {setSelected(!cardIsSelected); if (typeof onSelect === 'function') onSelect(!cardIsSelected);}}} // Handle selection and trigger the onSelect function if given
            sx={{ display: 'flex', 
            backgroundColor: ((selectable ? (cardIsSelected ? (cardIsRemoved ? 'var(--base_site_MTColorDark, #202D2B)' : 'var(--base_site_MTColorDark, #202D2B)') : (cardIsRemoved ? 'var(--base_site_MTColorLight, #FFFBF8)' : 'var(--base_site_MTColorLight, #FFFBF8)')) : 'var(--base_site_MTColorLight, #FFFBF8)')), // change background color if card is selected
            boxShadow : '0px 0px 20px 0px #A8A8A8',
            borderRadius : '8px',
            width : width,
            height : height
        }}>
            <CardMedia
                component="img"
                sx={variantSx}
                image={smallPhotoURL}
                alt={"Photo of " + name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width : '80%' }}>
                <CardContent 
                    // Style our content to not overlap with the badge if the badge is present, BUT if the badge is not present, don't squish everything as if there was the badge
                    sx={{ flex: '1 0 auto', marginTop : (((selectable || hasStar) && typeof displayBadge === 'undefined') ? '-5px' : '-5px') }}>
                    <Typography component="div" variant="h5" 
                        // Change text styling based on selection state (same for the details.map(...) block)
                        sx={{color:  ((selectable ? (cardIsSelected ? 'var(--base_site_light, white)' : 'var(--base_site_dark, black)') : 'var(--base_site_dark, black)'))}}>
                        {name}
                    </Typography>
                    {
                        typeof details !== 'undefined' ? 
                        details.map((d) => { // For each of our key-value pairs, fill in the information and style it appropriately
                            return (
                                <div key={Math.random()}>
                                    {
                                        typeof d.key !== 'undefined' ?
                                            <Typography display="inline"  sx={{
                                                color:  ((selectable ? (cardIsSelected ? 'var(--base_site_neutralLight, lightgray)' : 'var(--base_site_neutral, gray)') : 'var(--base_site_neutral, gray)'))
                                            }}>{d.key}: </Typography> :
                                        undefined
                                    }
                                    {
                                        typeof d.key !== 'undefined' ?
                                            <Typography display="inline" sx={{
                                                color:  ((selectable ? (cardIsSelected ? 'var(--base_site_light, white)' : 'var(--base_site_dark, black)') : 'var(--base_site_dark, black)'))
                                            }}>{d.value}</Typography>
                                        :   <Typography display="inline"  sx={{
                                                color:  ((selectable ? (cardIsSelected ? 'var(--base_site_neutralLight, lightgray)' : 'var(--base_site_neutral, gray)') : 'var(--base_site_neutral, gray)'))
                                            }}>{d.value}</Typography>
                                    }
                                </div>
                            );
                        }) 
                        : undefined
                    }
                    {
                        typeof mainElement !== 'undefined' ?
                        <Box onClick={(e:any) => {e.stopPropagation();}}>{mainElement}</Box> :
                        undefined
                    }
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: 1, pb: 1 }}>
                    {
                    typeof actionableElements !== 'undefined' ?
                    actionableElements.map((a) => { // For each of our actionable elements, style them to fit the card
                        let tmp = <Box key={Math.random()} sx={{ margin: ".5rem" }} 
                        // Stop our click events from bubbling up to the card and selecting it when we're trying to push buttons
                        onClick={(e:any) => {e.stopPropagation();}}> {a} </Box>;
                        return tmp;
                    }) : undefined
                    }
                </Box>
            </Box>
            <Box sx={{width: "20%"}}>
                <Grid container flexDirection="column" alignItems="center" marginTop="10px">
                    <Grid item xs={badgeSize} sm={badgeSize} md={badgeSize} lg={badgeSize}>
                        {
                            displayBadge
                        }
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        {
                            (hasStar ? <img width='25px' height='25px' src={(star)} alt="Star"></img> : undefined)
                        }
                    </Grid>
                    <Grid item xs={selectable ? 8 : 0} sm={selectable ? 8 : 0} md={selectable ? 8 : 0}>
                        {
                            // Style our checkmark and switch SVG image source on selection/deselection
                            (selectable && <img width='25px' height='25px' src={(cardIsSelected ? checked : unchecked)} alt="Checkbox"></img>)
                        }
                    </Grid>
                    <Grid item xs={remove ? 8 : 0} sm={remove ? 8 : 0} md= {remove ? 8 : 0}>
                        {
                            (remove && <img width="25px" height='25px' style={{cursor:"pointer"}} src={redX} alt="Remove" onClick={(e) => removeCard(e)}></img>)
                        }
                    </Grid>
                </Grid>
            </Box>
        </Card>
    </context.Provider>
  );
};
