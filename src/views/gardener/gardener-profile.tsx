import {
  Grid,
  Typography,
  Box,
  TextField,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Dialog,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { instance as axios } from "axios-instance";
import { PFButton } from "components/designs/custom-button";
import APIURL from "APIURL";
import { setAuth } from "../../state/slices/user-slice";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { setGardenerName } from "../../state/slices/user-slice";
import { DeliverySummary } from "components/designs/delivery-summary";
import { Delivery } from "../../models/delivery.model";
import { setDeliveries } from "../../state/slices/delivery-slice";

export const GardenerProfile = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state: any) => state.userInfo);
  const [tempName, setTempName] = useState(
    userInfo.userObj.gardenerProfile
      ? userInfo.userObj.gardenerProfile.name
      : null
  );
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const deliveries = useAppSelector(
    (state: any) => state.deliveryList.deliveries
  );

  const [emailPopUp, setEmailPopUp] = useState(false);
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [successfullyDeleted, setSuccessfullyDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  const deliveriesGrown = deliveries.filter(
    (item: Delivery) => item.type === "grown"
  );
  const deliveriesDonated = deliveries.filter(
    (item: Delivery) => item.type === "donated"
  );
  const amountGrown = deliveriesGrown.reduce(
    (acc: number, item: Delivery) => acc + item.amount,
    0
  );
  const amountDonated = deliveriesDonated.reduce(
    (acc: number, item: Delivery) => acc + item.amount,
    0
  );

  const togglePopup = () => {
    if (confirmPopUp) {
      setConfirmPopUp(!confirmPopUp);
      setEmailPopUp(!emailPopUp);
    } else {
      setConfirmPopUp(!confirmPopUp);
    }
    setDeleteError("");
  };

  //Changing Names ////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setShowSaveButton(
      userInfo.userObj.gardenerProfile &&
        tempName !== userInfo.userObj.gardenerProfile.name
    );
  }, [tempName, userInfo]);

  const saveGardenerInfo = async () => {
    let wasError = false;

    if (
      userInfo.userObj.gardenerProfile &&
      tempName !== userInfo.userObj.gardenerProfile.name
    ) {
      const res = await axios.patch(
        `${APIURL}/gardeners/${userInfo.userObj.gardenerProfile.id}`,
        {
          name: tempName,
        }
      );
      dispatch(setGardenerName(tempName));
      if (res.status !== 200) wasError = true;
    }
    setError(wasError);
    setShowSaveButton(false);
  };
  //Changing Names ////////////////////////////////////////////////////////////////////////////////////

  const deleteGardenerAccount = async () => {
    try {
      await axios.delete(`${APIURL}/users/${userInfo.userObj.id}`, {
        data: {
          email: tempEmail,
        },
      });

      setEmailPopUp(false);
      setSuccessfullyDeleted(!successfullyDeleted);
    } catch (error: any) {
      setDeleteError(`${error.response.data.message}`);
    }
  };

  const getData = useCallback(async () => {
    setLoading(true);
    const res = await axios.get(`${APIURL}/deliveries`, {
      params: {
        showAs: "gardener",
      },
    });
    dispatch(setDeliveries(res.data.data as Delivery[]));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (axios.defaults.headers.common["Authorization"] !== undefined) {
      getData();
    }
  }, [getData]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: 6,
        }}
      >
        {error && (
          <Alert severity="error">
            There was an error saving your information
          </Alert>
        )}
        <Typography variant="h4" fontWeight="700" marginTop={3}>
          About
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            marginBottom: "20px",
          }}
        >
          <Typography>
            <b>Email: </b>
            {userInfo.userObj.email}
          </Typography>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              sx={{ backgroundColor: "var(--base_site_MTColorLight, #fffbf8)" }}
            />
            {showSaveButton && (
              <PFButton
                text="Save"
                sx={{ width: "150px", marginTop: "5px", marginLeft: "10px" }}
                onClick={saveGardenerInfo}
              />
            )}
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <PFButton
              text="Reset Password"
              sx={{ width: "200px", margin: "normal", marginTop: "10px" }}
              onClick={() => navigate("/sign-in/forgot", {state: { fromProfile: true }})}
            />
            <PFButton
              text="Delete Account"
              baseColor="var(--base_site_destructiveButtonColor, #a44433)"
              hoverColor="var(--base_site_destructiveButtonHoverColor, #d35c4c)"
              sx={{ width: "200px", marginTop: "10px", marginLeft: "5px" }}
              onClick={togglePopup}
            />
          </Box>
        </Box>

        {/** Prompts a Warning PopUp before deleting profile */}
        {confirmPopUp && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Box
              sx={{
                width: "80%",
                maxWidth: 600,
                maxHeight: "72vh",
                minHeight: "40vh",
                borderRadius: 4,
                padding: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="700"
                color="var(--base_site_MTColorDark, #202d2b)"
                sx={{ marginBottom: "10px" }}
              >
                Are you sure?
              </Typography>
              <Typography
                variant="body1"
                fontWeight="500"
                color="var(--base_site_MTColorDark, #202d2b)"
                textAlign="center"
              >
                Do you really want to delete your account. This process cannot
                be undone.
              </Typography>

              <Box
                height="100%"
                width="100%"
                display="flex"
                justifyContent="space-evenly"
                marginTop="10px"
              >
                <PFButton
                  text="No, I'm not"
                  secondary={true}
                  onClick={() => setConfirmPopUp(false)}
                  sx={{ width: "150px" }}
                />
                <PFButton
                  text="Yes, I'm sure"
                  onClick={togglePopup}
                  sx={{ width: "150px" }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {/** Prompts user for email in order to delete their profile */}
        {emailPopUp && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Box
              sx={{
                width: "80%",
                maxWidth: 600,
                maxHeight: "72vh",
                minHeight: "40vh",
                borderRadius: 4,
                padding: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.paper",
              }}
            >
              {deleteError.length > 0 && (
                <Alert severity="error">{deleteError}</Alert>
              )}
              <Typography
                variant="h4"
                fontWeight="700"
                color="var(--base_site_MTColorDark, #202d2b)"
                sx={{ marginBottom: "10px" }}
              >
                Delete Account
              </Typography>
              <Typography variant="body1" fontWeight="500" color="var(--base_site_MTColorDark, #202d2b)">
                Enter your email below to confirm the deletion of your account.
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(e) => setTempEmail(e.target.value)}
                sx={{ backgroundColor: "white" }}
              />
              <Box
                height="100%"
                width="100%"
                display="flex"
                justifyContent="space-evenly"
                marginTop="10px"
              >
                <PFButton
                  text="Cancel"
                  secondary={true}
                  onClick={() => setEmailPopUp(false)}
                  sx={{ width: "150px" }}
                />
                <PFButton
                  text="Delete"
                  baseColor="var(--base_site_destructiveButtonColor, #a44433)"
                  hoverColor="var(--base_site_destructiveButtonHoverColor, #d35c4c)"
                  onClick={deleteGardenerAccount}
                  sx={{ width: "150px" }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {/** Is prompted when account is successfully deleted */}
        <Dialog
          open={successfullyDeleted}
          onClose={() => {
            localStorage.clear();
            navigate("/");
            dispatch(
              setAuth({
                authToken: "",
                gardenAuthorized: false,
                foodBankAuthorized: false,
                userObj: { id: null, email: "" },
              })
            );
            localStorage.setItem("expiry", "0");
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              padding: 6,
            }}
          >
            <Typography variant="h3" sx={{ color: "var(--base_site_success, green)", fontWeight: "700" }}>
              Success!
            </Typography>
            <Typography variant="h6">
              <strong>Account has been successfully deleted.</strong>
            </Typography>
          </Box>
        </Dialog>

        <Typography variant="h4" fontWeight="700" marginTop={3}>
          Statistics
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <Card
            sx={{
              display: "flex",
              backgroundColor: "var(--base_site_MTColorLight, #fffbf8)", // change background color if card is selected
              boxShadow: "0px 0px 20px 0px #A8A8A8",
              borderRadius: "8px",
              width: "80vw",
              height: "auto",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <CardContent>
                <Typography>
                  <b>Total Deliveries:</b> {deliveries.length}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px",
                    }}
                  >
                    <Typography>
                      <b>Grown:</b> {deliveriesGrown.length}
                    </Typography>
                    <Typography>
                      <b>Total Amount Grown:</b>{" "}
                      {(amountGrown / 16).toFixed(2) + " lbs"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px",
                    }}
                  >
                    <Typography>
                      <b>Donated:</b> {deliveriesDonated.length}
                    </Typography>
                    <Typography>
                      <b>Total Amount Donated:</b>{" "}
                      {(amountDonated / 16).toFixed(2) + " lbs"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Box>
        <Typography variant="h4" fontWeight="700" marginTop={3}>
          Delivery History
        </Typography>
        <Box
          sx={{
            padding: "16px 2px 0px 8px",
            flex: 1,
            display: "flex",
          }}
        >
          {
            // if not loaded
            loading ? (
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <CircularProgress size={75} thickness={5} />
                </Grid>
              </Grid>
            ) : (
              // if loaded
              <Grid container spacing={2} style={{ justifyContent: "left" }}>
                {deliveries.length > 0 ? (
                  deliveries.map((item: Delivery) => (
                    <Grid item xs={"auto"} key={"pid" + item.id}>
                      <DeliverySummary
                        delivery={item}
                        width="80vw"
                        height="150px"
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={"auto"}>
                    <Typography variant="h6" sx={{ marginLeft: "32px" }}>
                      No deliveries yet.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            )
          }
        </Box>
      </Box>
    </Box>
  );
};
