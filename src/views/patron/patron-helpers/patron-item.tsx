import { Produce } from "../../../models/produce.model";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { useRef } from "react";
import { Card, Box, Typography } from "@mui/material";
import { miniReq } from "../../../models/mini-req.model";
import { RootState } from "state/store";
import { setReqList } from "state/slices/request-info-slice";
import { BaseCard } from "../../../components/designs/base-card";
import Spinner from "../../../components/designs/spinner";
import { PFButton } from "../../../components/designs/custom-button";
import plus from "../../../images/icons/plus.svg";

interface PatronItemProps {
  produce: Produce;
}

export const PatronItem = ({ produce }: PatronItemProps) => {
  const dispatch = useAppDispatch();
  const currentRequests = useAppSelector(
    (state: RootState) => state.requestInfo.reqList
  );

  const value = useRef(1);

  // when a produce item gets clicked on, update the sidebar list
  const toggleRequest = () => {
    const newRequests = JSON.parse(JSON.stringify(currentRequests));
    const selectedIndex = newRequests.findIndex(
      (req: miniReq) => req.id === produce.id
    );

    // if not in the list already, add it
    if (Number(selectedIndex) < 0) {
      newRequests.push({ name: produce.name, id: produce.id, amt: value.current });
    }
    else {
      // else, update the amount
      newRequests[selectedIndex].amt += Number(value.current);
    }
    dispatch(setReqList({ reqList: newRequests }));
    value.current = 1;
  };

  return (
    <Card>
      <BaseCard
        smallPhotoURL={`${produce.smallPhotoURL}`}
        name={produce.name}
        details={[{value: "The amount of times that I would eat this per week is..."}]}
        width="447px"
        height="244px"
        mainElement={
        <Box flexDirection="column">
          <Spinner value={value} minValue={1} maxValue={9999} marginBottom={5}/>
          <div><PFButton iconURL={plus} text="Add to Request List" onClick={toggleRequest} sx={{width: "250px !important", height: "40px !important", marginY: "10px !important"}}/></div>
          {/*<div><Button variant="text">More Info <img src={caretRight} alt=">" width="25px" height="25px"/></Button></div>*/}
        </Box>}
      />
    </Card>
  );
};
