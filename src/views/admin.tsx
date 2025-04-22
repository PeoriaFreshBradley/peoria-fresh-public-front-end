import React, { useState, useEffect } from 'react';
import { instance as axios } from 'axios-instance';
import { Delivery } from 'models/delivery.model';
import APIURL from 'APIURL';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { PFButton } from 'components/designs/custom-button';
import { User, UserType } from 'models/user.model';

const AdminPage = () => {
  const [upcomingDeliveries, setUpcomingDeliveries] = useState<Delivery[]>([]);
  const [verifiedDeliveries, setVerifiedDeliveries] = useState<Delivery[]>([]);
  const [foodBankAddress, setFoodBankAddress] = useState<string>('');
  const [actualAmountReceived, setActualAmountReceived] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const isAdmin = true;
        if (isAdmin) {
          const response = await axios.get(`${APIURL}/deliveries`, {
            params: {
              showAs: "food-bank-admin"
            }
          });
          console.log('Response from API:', response.data);
          if (!response.data || typeof response.data !== 'object' || !Array.isArray(response.data.data)) {
            console.error('Response data does not contain expected structure:', response.data);
            return;
          }
          const upcoming = response.data.data.filter((delivery: Delivery) => !delivery.isVerified);
          const verified = response.data.data.filter((delivery: Delivery) => delivery.isVerified);
          setUpcomingDeliveries(upcoming);
          setVerifiedDeliveries(verified);
          if (response.data.data.length > 0) {
            setFoodBankAddress(response.data.data[0].location.address);
          }
        }
      } catch (error) {
        console.error('Error getting deliveries:', error);
      }
    };

    fetchDeliveries();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const verifyDelivery = async (id: number): Promise<void> => {
    setOpen(true);
    setSelectedDeliveryId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      console.log(`Verifying delivery with ID ${selectedDeliveryId}`);
      await axios.patch(`${APIURL}/deliveries/${selectedDeliveryId}`, {
        verifiedAmount: actualAmountReceived * 16
      });

      const updatedUpcomingDeliveries = upcomingDeliveries.filter(delivery => delivery.id !== selectedDeliveryId);
      setUpcomingDeliveries(updatedUpcomingDeliveries);

      const verifiedDelivery = upcomingDeliveries.find(delivery => delivery.id === selectedDeliveryId);
      if (verifiedDelivery) {
        verifiedDelivery.verifiedAmount = actualAmountReceived * 16;
        setVerifiedDeliveries(prevState => [...prevState, verifiedDelivery]);
      }

      setOpen(false);
      setActualAmountReceived(0);
    } catch (error) {
      console.error('Error verifying delivery:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ overflow: 'auto', maxHeight: '50vh', width: '90%' }}>
        <h2>Upcoming Deliveries For: {foodBankAddress}</h2>
        <TableContainer component={Paper} style={{ overflow: 'auto' }}>
          <Table style={{ overflow: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableCell>Produce</TableCell>
                <TableCell>Amount Expected (in pounds)</TableCell>
                <TableCell>Gardener</TableCell>
                <TableCell>Expected Delivery Date</TableCell>
                <TableCell>Verify Delivery</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(upcomingDeliveries) && upcomingDeliveries.map((delivery, index) => (
                <TableRow key={index}>
                  <TableCell>{delivery.produce.name}</TableCell>
                  <TableCell>{(delivery.amount) / 16}</TableCell>
                  <TableCell>{delivery.provider.name}</TableCell>
                  <TableCell>{formatDate(delivery.expectedDeliveryDate)}</TableCell>
                  <TableCell>
                    <PFButton text="Verify" onClick={() => verifyDelivery(delivery.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={{ overflow: 'auto', maxHeight: '50vh', width: '90%' }}>
        <h2>Verified Deliveries For: {foodBankAddress}</h2>
        <TableContainer component={Paper}>
          <Table style={{ overflow: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableCell>Produce</TableCell>
                <TableCell>Amount Received (in pounds)</TableCell>
                <TableCell>Gardener</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(verifiedDeliveries) && verifiedDeliveries.map((delivery, index) => (
                <TableRow key={index}>
                  <TableCell>{delivery.produce.name}</TableCell>
                  <TableCell>{delivery?.verifiedAmount ? (delivery.verifiedAmount) / 16 : ''}</TableCell>
                  <TableCell>{delivery.provider.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Actual Amount Received (in pounds)</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="actual-amount"
            label="Actual Amount"
            type="number"
            fullWidth
            value={actualAmountReceived}
            onChange={(e) => setActualAmountReceived(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <PFButton text="Cancel" baseColor="var(--base_site_destructiveButtonColor, #a44433)" hoverColor="var(--base_site_destructiveButtonHoverColor, #d35c4c)" onClick={handleClose} />
          <PFButton text="Verify" onClick={handleConfirm} />
        </DialogActions>

      </Dialog>
    </div>
  );
};

export default AdminPage;
