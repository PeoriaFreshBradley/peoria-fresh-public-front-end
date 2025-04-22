import { useAppDispatch } from "../../state/hooks";
import { Card, Box, Typography, CardContent } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Delivery } from "../../models/delivery.model";

type DeliverySummaryProps = {
    delivery: Delivery;
    width: string;
    height: string;
};

export const DeliverySummary = ({
    delivery,
    width,
    height
}:DeliverySummaryProps) => {

  return (
        <Card 
            sx={{ display: 'flex', 
            backgroundColor: 'var(--base_site_MTColorLight, #fffbf8)',
            boxShadow : '0px 0px 20px 0px #A8A8A8',
            borderRadius : '8px',
            width : width,
            height : height
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width : '100%' }}>
                <CardContent 
                    sx={{ flex: '1 0 auto', marginTop : '-5px' }}>
                    <Box sx={{alignItems: 'center', marginBottom: '10px', paddingX: '10px', paddingY: '3px', display: 'flex', flexDirection: 'row', backgroundColor: 'var(--base_site_MTColorDark, #202d2b)', borderRadius: '5px', color: 'white'}}>
                        <Typography variant="h5" sx={{marginRight: '30px'}}>
                            {delivery.produce.name}
                        </Typography>
                        {/*display the amount in pounds if divisible by 16, otherwise display in ounces*/}
                        {/*display the verified amount if the delivery has been verified*/}
                        <Typography variant="h6" fontWeight="100" sx={{marginRight: '5px'}}>
                            {delivery.isVerified && delivery.verifiedAmount !== undefined
                                ? delivery.verifiedAmount % 16 === 0 ? delivery.verifiedAmount/16 + ' lbs' : delivery.verifiedAmount + ' oz'
                                : delivery.amount % 16 === 0 ? delivery.amount/16 + ' lbs' : delivery.amount + ' oz'
                            }
                        </Typography>
                        {/*display a check mark if the delivery is verified*/}
                        {delivery.isVerified && <CheckCircleIcon/>}
                    </Box>
                    <Typography>
                        {delivery.location.address}
                    </Typography>
                    <Typography>
                        <b>Delivery Expected:</b> {new Date(delivery.expectedDeliveryDate).toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
  );
};
