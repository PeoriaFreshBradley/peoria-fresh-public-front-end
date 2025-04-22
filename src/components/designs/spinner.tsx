import React from "react";
import { Button, Typography, Box, TextField, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { PFButton } from "./custom-button";
import plus from "../../images/icons/plus.svg";
import minus from "../../images/icons/minus.svg";

export interface SpinnerProps {
  marginBottom?: number;
  maxValue?: number;
  minValue?: number;
  value: React.MutableRefObject<number>; //this is the type signature for a useRef hook
  unitList?: string[];
  unitIndex?: number;
  setUnitIndex?: (index: number) => void;
}

export const Spinner = (props:SpinnerProps) => {
  const decrement = () => {
    //makes sure the value is an integer
    if (!Number.isInteger(inputValue))
      setInputValue(Math.round(inputValue ? inputValue : 0));

    // clamps to minValue if minValue is defined
    const newValue = inputValue ?
      props.minValue !== undefined ? (props.minValue < inputValue ? inputValue - 1 : props.minValue) : inputValue - 1 :
      props.minValue !== undefined ? (props.minValue < 0 ? -1 : props.minValue) : -1;
    props.value.current = newValue;
    setInputValue(newValue);
  };
  const increment = () => {
    // makes sure the value is an integer
    if (!Number.isInteger(inputValue))
      setInputValue(Math.round(inputValue ? inputValue : 0));

    // clamps to maxValue if maxValue is defined
    const newValue = inputValue ?
      props.maxValue !== undefined ? (props.maxValue > inputValue ? inputValue + 1 : props.maxValue) : inputValue + 1 :
      props.maxValue !== undefined ? (props.maxValue > 0 ? 1 : props.maxValue) : 1;
    props.value.current = newValue;
    setInputValue(newValue);
  };

  const [inputValue, setInputValue] = useState<number | null>(props.value.current);

  const handleInputChange = (event: any) => {
    if (event.target.value === ""){
      props.value.current = props.minValue ? props.minValue : 0;
      setInputValue(null);
    }
    else {
      //makes sure the value is an integer
      let value = Number(event.target.value);
      if (!Number.isInteger(Number(event.target.value)))
        value = Math.round(value);

      // clips to maxValue and minValue if they are defined
      if (props.maxValue !== undefined && value > props.maxValue) value = props.maxValue;
      if (props.minValue !== undefined && value < props.minValue) value = props.minValue;

      props.value.current = value;
      setInputValue(value);
    }
  }
  useEffect(() => {
    setInputValue(props.value.current);
  }, [props.value]);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "props.marginBottom ? props.marginBottom : 0"
        }}
      >
        <Box sx={{marginRight: 3.5}}>
          <PFButton onClick={decrement} iconURL={minus} sx={{width: "39px", height: "39px", padding: "0.2rem 0.2rem"}}/>
        </Box>
        <Typography>
          <TextField
            sx={{
              '& input[type="number"]': {
                MozAppearance: 'textfield',
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
              },
            }}
            InputProps={{
              startAdornment: props.unitList && props.unitIndex !== undefined && <InputAdornment position="start">{props.unitList[props.unitIndex]}</InputAdornment>,
            }}
            value={inputValue}
            onChange={handleInputChange}
            inputProps={{
              type: "number",
              stepSize: 1,
              min: props.minValue,
              max: props.maxValue
            }}
          />
        </Typography>
        <Box sx={{marginLeft: 3.5}}>
          <PFButton onClick={increment} iconURL={plus} sx={{width: "39px", height: "39px", padding: "0.2rem 0.2rem"}}/>
        </Box>
      </div>
      <div>
        {
          props.unitList && props.unitList.length > 1 && 
          <Button variant="text" onClick={
            () => props.unitList && props.unitIndex !== undefined && props.setUnitIndex ? 
            props.setUnitIndex((props.unitIndex + 1) % props.unitList.length) : {}
          }>
            Change Units
          </Button>
        }
      </div>
    </React.Fragment>
  );
};

export default Spinner;
