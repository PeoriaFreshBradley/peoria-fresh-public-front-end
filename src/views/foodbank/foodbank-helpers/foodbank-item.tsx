import { Produce } from "../../../models/produce.model";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { Card, Box } from "@mui/material";
import { miniReq } from "../../../models/mini-req.model";
import { useState, useRef } from "react";
import { RootState } from "../../../state/store";
import { BaseCard } from "../../../components/designs/base-card";
import Spinner from "../../../components/designs/spinner";
import { PFButton } from "../../../components/designs/custom-button";
import plus from "../../../images/icons/plus.svg";
import { setFoodbankReqList } from "state/slices/request-info-slice";

interface FoodbankItemProps {
  produce: Produce;
}

export const FoodbankItem = ({ produce }: FoodbankItemProps) => {

  const dispatch = useAppDispatch();
  const currentRequest = useAppSelector(
    (state: RootState) => state.requestInfo.foodbankReqList
  );

  const value = useRef(1);
  const unitList = ["oz", "lbs"];
  const [unitIndex, setUnitIndex] = useState(1); // index of the unit that is being used from unitList

  // when a produce item gets clicked on, update the sidebar list
  const toggleRequest = () => {
    const newRequest = JSON.parse(JSON.stringify(currentRequest));
    const selectedIndex = newRequest.findIndex(
      (req: miniReq) => req.id === produce.id
    );
    
    // if not in the list already, add it
    if (Number(selectedIndex) < 0) {  
      newRequest.push({ name: produce.name, id: produce.id, amt: unitIndex === 1 ? Number(value.current) * 16 : value.current, displayInPounds: unitIndex === 1 ? true : false, requestingLocations: produce.extra.locations });
    }
    else { // else, update the amount
      newRequest[selectedIndex].amt += unitIndex === 1 ? Number(value.current) * 16 : Number(value.current);
      if(newRequest[selectedIndex].displayInPounds && unitIndex === 0) newRequest[selectedIndex].displayInPounds = false;
    }
    // update redux store
    dispatch(setFoodbankReqList({ reqList: newRequest }));
    value.current = 1;
  };

  return (
    <Card>
      <BaseCard
        smallPhotoURL={`${produce.smallPhotoURL}`}
        name={produce.name}
        details={[{value: " "}, {value: "I would like to request..."}]}
        width="447px"
        height="244px"
        mainElement={
        <Box flexDirection="column">
          <Spinner value={value} minValue={1} maxValue={9999} unitList={unitList} unitIndex={unitIndex} setUnitIndex={setUnitIndex} marginBottom={5}/>
          <div><PFButton iconURL={plus} text="Add to Request List" onClick={toggleRequest} sx={{width: "250px !important", height: "40px !important", marginY: "10px !important"}}/></div>
        </Box>}
      />
    </Card>
  );
};

