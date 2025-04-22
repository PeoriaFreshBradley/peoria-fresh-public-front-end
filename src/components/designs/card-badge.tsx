import { Box, Typography } from "@mui/material";
import harvest from '../../images/icons/harvest.svg';
import star from '../../images/icons/star.svg';
import seedPacket from '../../images/icons/seedPacket.svg';
import growing from '../../images/icons/growing.svg';
import { useContext, Context } from "react";
import { styled } from "styled-components";


export interface BadgeConfig {
    textColor?: string,
    iconURL?: string,
    name?: string,
    backgroundColor?: string,
    context: Context<boolean>,
};

// This is a weird thing I had to do to get the icon fill colors to change on select
const Masked = styled.img<{maskSrc?:string;}>`
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

export const BaseCardBadge = (properties : BadgeConfig) => {
    const cardIsSelected = useContext(properties.context); // Use the context provided to use from the card we're a part of to keep track of its state (selected or not) and keep track of when to change style
    return (
        <Box>
            <Box sx={{
                borderRadius: '8px',
                backgroundColor: cardIsSelected ? '#var(--base_site_light, white)' : properties.backgroundColor, // Be white if selected, if not, be provided background color
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                flex : '1 0 auto',
                display: 'flex',
                marginLeft : '.5rem',
                alignItems : 'center',
                justifyContent : 'space-evenly',
                marginTop : '4px'
            }}>
                <Masked maskSrc={properties.iconURL} style={{ 
                    height : '2rem', 
                    width: '2rem', 
                    border : 'none',
                    backgroundColor : (cardIsSelected ? properties.backgroundColor : 'var(--base_site_light, white)')}} // swap icon fill color when selected
                />
                <Typography sx={{color : (cardIsSelected ? properties.backgroundColor : properties.textColor), marginTop: '.5rem', marginBottom: '.5rem'}}>{properties.name}</Typography>
            </Box>
        </Box>
    );
}

export const NotPlantedBadge = (props:any) => {
    return (
        <BaseCardBadge 
            name={"Not Planted"}
            backgroundColor='var(--base_site_buttonHoverColor, #50603B)'
            textColor="var(--base_site_light, white)"
            iconURL={seedPacket}
            context={props.context}
        ></BaseCardBadge>
    );
}

export const CommReqBadge = (props:any) => {
    return (
        <BaseCardBadge 
            name={"Community Request"}
            backgroundColor='var(--base_site_activePopupColor, #EA7F3A)'
            textColor="var(--base_site_light, white)"
            iconURL={star}
            context={props.context}
        ></BaseCardBadge>
    );
}

export const HarvestedBadge = (props:any) => {
    return (
        <BaseCardBadge 
            name={"Harvested"}
            backgroundColor='var(--base_site_activePopupColor, #EA7F3A)'
            textColor="var(--base_site_light, white)"
            iconURL={harvest}
            context={props.context}
        ></BaseCardBadge>
    );
}

export const GrowingBadge = (props:any) => {
    return (
        <BaseCardBadge 
            name={"Growing"}
            backgroundColor='var(--base_site_MTColorDark, #202D2B)'
            textColor="var(--base_site_light, white)"
            iconURL={growing}
            context={props.context}
        ></BaseCardBadge>
    );
}