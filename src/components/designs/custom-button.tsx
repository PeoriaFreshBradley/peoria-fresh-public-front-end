import { styled } from '@mui/material/styles';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import { styled as styledComp } from "styled-components";
import harvest from '../../images/icons/harvest.svg';
import growing from '../../images/icons/growing.svg';
import edit from '../../images/icons/edit.svg';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { hover } from '@testing-library/user-event/dist/hover';

const Masked = styledComp.img<{maskSrc?:string;}>`
  -webkit-mask-image: ${props =>  `url("${props.maskSrc}")`};
  mask-image: ${props =>  `url("${props.maskSrc}")`};
  mask-repeat: no-repeat;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  width: 2rem;
  height: 2rem;
  object-fit: cover;
`;

export interface CustomButtonConfig extends ButtonBaseProps {
    text?: string,
    iconURL?: string,
    baseColor?: string,
    hoverColor?: string,
    fullWidth?: boolean,
    secondary?: boolean,
};

export interface PFButtonConfig {
    disabled?: boolean,
    onClick?: any
};

const BaseButton = styled(ButtonBase)<CustomButtonConfig>(({ theme, baseColor = 'var(--base_site_MTColorDark, #202d2b)', hoverColor = 'var(--base_site_buttonHoverColor, #50603b)', secondary = false }) => ({
  position: 'relative',
  borderRadius: "1.5625rem",
  border: `3.5px solid ${baseColor}`,
  padding: '0.2rem 1rem',
  backgroundColor: secondary ? "white" : baseColor,
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  color: secondary? baseColor : 'var(--base_site_MTColorLight, #fffbf8)',
  transition: theme.transitions.create(['background-color', 'border-color']),
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    transition: theme.transitions.create(['background-color', 'border-color', 'color']),
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: secondary? "white" : hoverColor,
    border: `3.5px solid ${hoverColor}`,
    color: secondary ? hoverColor : "var(--base_site_MTColorLight, #fffbf8)"
  },
  '&:disabled': { // Styles for disabled state
    color: 'rgba(255, 251, 248, 0.69)',
    borderRadius: "1.5625rem",
    border: "3.5px solid var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))",
    padding: '0.2rem 1rem',
    backgroundColor: 'var(--base_site_inactiveUIColor, rgba(44, 65, 44, 0.69))',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  }
}));

const ListButton = styled(ButtonBase)<CustomButtonConfig>(({theme, baseColor = 'var(--base_site_MTColorLight, #fffbf8)', hoverColor = 'var(--base_site_MTColorLight, #fffbf8)'}) => ({
    position: 'relative',
    borderRadius: "1.5625rem",
    border: `3.5px solid ${baseColor}`,
    padding: '1.2rem 1rem',
    backgroundColor: baseColor,
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
    transition: theme.transitions.create(['background-color', 'border-color']),
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      transition: theme.transitions.create(['background-color', 'border-color']),
      boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
      backgroundColor: hoverColor,
      border: `3.5px solid ${hoverColor}`,
    },

}));

export const PFButton = (props:CustomButtonConfig) => {
    const [isHover, changeHover] = useState(false);

    let realsx = props.sx;
    if (props.fullWidth) {
        realsx = {...props.sx, width: "100%", position: "relative"};
    }
    return (
        <BaseButton 
        onClick={props.onClick} 
        disabled={props.disabled} 
        sx={realsx}
        baseColor={props.baseColor}
        hoverColor={props.hoverColor} 
        secondary ={props.secondary}
        onMouseOver={() => {changeHover(true);}}
        onMouseLeave={() => {changeHover(false);}}
        >
            {
                props.iconURL ? 
                <Box sx={{margin: '2px'}}>
                    <Masked style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        backgroundColor: (props.disabled ? 'rgba(255, 251, 248, 0.69)' : 'var(--base_site_MTColorLight, #fffbf8)')
                    }} maskSrc={props.iconURL}/>
                </Box>
                : undefined
            }
            {
                props.text ? 
                <Box sx={{margin: '2px'}}>
                    <Typography fontWeight={"600"}>
                        {props.text}
                    </Typography>
                </Box>
                : undefined
            }
        </BaseButton>
    );
}

export const PFListButton = (props:CustomButtonConfig) => {
    const [isHover, changeHover] = useState(false);

    let realsx = props.sx;
    if (props.fullWidth) {
        realsx = {...props.sx, width: "100%", position: "relative"};
    }
    return (
        <ListButton 
        onClick={props.onClick} 
        disabled={props.disabled} 
        sx={realsx}
        baseColor={props.baseColor}
        hoverColor={props.hoverColor} 
        onMouseOver={() => {changeHover(true);}}
        onMouseLeave={() => {changeHover(false);}}
        >
            {
                props.text ? 
                <Box sx={{margin: '2px'}}>
                    <Typography fontWeight={"600"} sx={{ fontSize: "24px"}}>
                        {props.text}
                    </Typography>
                </Box>
                : undefined
            }
            {
                props.iconURL ? 
                <Box sx={{margin: '2px'}}>
                    <Masked style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        backgroundColor: (props.disabled ? '#9D9D9D' : 'black')
                    }} maskSrc={props.iconURL}/>
                </Box>
                : undefined
            }
        </ListButton>
    );
}

export const HarvestBtn = (props:PFButtonConfig) => {
    return (
        <PFButton text={"Harvest"} iconURL={harvest} disabled={props.disabled} onClick={props.onClick}/>
    )
}

export const GrowBtn = (props:PFButtonConfig) => {
    return (
        <PFButton text={"Grow"} iconURL={growing} disabled={props.disabled} onClick={props.onClick}/>
    )
}

export const EditBtn = (props:PFButtonConfig) => {
    return (
        <PFButton text={"Edit"} iconURL={edit} disabled={props.disabled} onClick={props.onClick}/>
    )
}

export const RequestBtn = (props:PFButtonConfig) => {
    return (
        <PFButton text={"Request"} disabled={props.disabled} onClick={props.onClick}/>
    )
}