import { Produce } from "../../../models/produce.model";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { Card, Box } from "@mui/material";
import { miniReq } from "../../../models/mini-req.model";
import { useState, useRef } from "react";
import { RootState } from "../../../state/store";
import { setAccepting } from "../../../state/slices/accepting-info-slice";
import { BaseCard } from "../../../components/designs/base-card";
import Spinner from "../../../components/designs/spinner";
import { PFButton } from "../../../components/designs/custom-button";
import plus from "../../../images/icons/plus.svg";

interface GardenerItemProps {
  produce: Produce;
}

export const GardenerItem = ({ produce }: GardenerItemProps) => {

  const dispatch = useAppDispatch();
  const currentAccepting = useAppSelector(
    (state: RootState) => state.acceptingInfo.reqList
  );

  const value = useRef(1);
  const unitList = ["oz", "lbs"];
  const [unitIndex, setUnitIndex] = useState(1); // index of the unit that is being used from unitList

  // when a produce item gets clicked on, update the sidebar list
  const toggleRequest = () => {
    const newAccepting = JSON.parse(JSON.stringify(currentAccepting));
    const selectedIndex = newAccepting.findIndex(
      (req: miniReq) => req.id === produce.id
    );
    
    // if not in the list already, add it
    if (Number(selectedIndex) < 0) {  
      newAccepting.push({ name: produce.name, id: produce.id, amt: unitIndex === 1 ? Number(value.current) * 16 : value.current, displayInPounds: unitIndex === 1 ? true : false, requestingLocations: produce.extra.locations });
    }
    else { // else, update the amount
      newAccepting[selectedIndex].amt += unitIndex === 1 ? Number(value.current) * 16 : Number(value.current);
      if(newAccepting[selectedIndex].displayInPounds && unitIndex === 0) newAccepting[selectedIndex].displayInPounds = false;
    }
    // update state manager
    dispatch(setAccepting({ reqList: newAccepting }));
    value.current = 1;
  };

  return (
    <Card>
      <BaseCard
        smallPhotoURL={`${produce.smallPhotoURL}`}
        hasStar={produce.extra.isCommunityRequest}
        name={produce.name}
        details={[{value: produce.extra.isCommunityRequest ? Math.ceil(produce.extra.totalAmount/16) + " lbs requested, " + produce.extra.locations.length + " locations" : "None requested"}, {value: "I can grow..."}]}
        width="447px"
        height="244px"
        mainElement={
        <Box flexDirection="column">
          <Spinner value={value} minValue={1} maxValue={9999} unitList={unitList} unitIndex={unitIndex} setUnitIndex={setUnitIndex} marginBottom={5}/>
          <div><PFButton iconURL={plus} text="Add to Plant List" onClick={toggleRequest} sx={{width: "250px !important", height: "40px !important", marginY: "10px !important"}}/></div>
          {/*<div><Button variant="text">More Info <img src={caretRight} alt=">" width="25px" height="25px"/></Button></div>*/}
        </Box>}
      />
    </Card>
  );
};

