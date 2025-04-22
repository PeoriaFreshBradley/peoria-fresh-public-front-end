import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setAuth } from "../../state/slices/user-slice";
import logo from "../../images/Logo.png";
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect } from 'react'

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector((state: any) => state.userInfo);

  const [gardenAuthorized, setGardenAuthorized] = useState(false);
  const [foodBankAuthorized, setFoodBankAuthorized] = useState(false);

  useEffect(() => {
    setGardenAuthorized(userInfo.gardenAuthorized);
    setFoodBankAuthorized(userInfo.foodBankAuthorized);
  }, [userInfo]);

  // Add state to manage the anchor element for the menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleSignOut = () => {
    // Clear local storage, navigate to home, and dispatch sign-out action
    localStorage.clear();
    navigate("/");
    dispatch(
      setAuth({ authToken: "", gardenAuthorized: false, foodBankAuthorized: false, userObj: { id: null, email: "" } })
    );
    handleMenuClose();
    localStorage.setItem('expiry', '0');
  };

  return (
    <AppBar
      position="static"
      style={{ maxHeight: "94px" }}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "var(--base_site_MTColorDark, #202d2b)" }}
    >
      <Toolbar
        style={{
          minHeight: "94px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Link to="/">
          <img src={logo} alt="Logo" height="72px" />
        </Link>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          {foodBankAuthorized && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                onClick={() => { navigate('/foodbank/admin') }}
                sx={{
                  display: "flex",
                  padding: "6px 16px",
                  gap: "6px",
                  borderRadius: "25px",
                  fontSize: "14px",
                  color: "var(--base_site_MTColorLight, #fffbf8)"
                }}
                variant="text"
              >
                <Typography border-radius="25px">
                  Verify Deliveries
                </Typography>
              </Button>
            </div>
          )}
          {foodBankAuthorized && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                onClick={() => { navigate('/foodbank/produce') }}
                sx={{
                  display: "flex",
                  padding: "6px 16px",
                  gap: "6px",
                  borderRadius: "25px",
                  fontSize: "14px",
                  color: "var(--base_site_MTColorLight, #fffbf8)"
                }}
                variant="text"
              >
                <Typography border-radius="25px">
                  Food Bank Admin Produce Request
                </Typography>
              </Button>
            </div>
          )}
          {gardenAuthorized && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                onClick={() => { navigate('/garden/dashboard') }}
                sx={{
                  display: "flex",
                  padding: "6px 16px",
                  gap: "6px",
                  borderRadius: "25px",
                  fontSize: "14px",
                  color: "var(--base_site_MTColorLight, #fffbf8)"
                }}
                variant="text"
              >
                <Typography border-radius="25px">
                  Gardener Dashboard
                </Typography>
              </Button>
              {/*The line below is the start of a new button on the NavBar*/}
              <Button
                onClick={() => { navigate('/garden/gettingstarted') }}
                sx={{
                  display: "flex",
                  padding: "6px 16px",
                  gap: "6px",
                  borderRadius: "25px",
                  fontSize: "14px",
                  color: "var(--base_site_MTColorLight, #fffbf8)"
                }}
                variant="text"
              >
                <Typography border-radius="25px">
                  Getting Started
                </Typography>
              </Button>
              {/*The line above is the end of a new button on the NavBar*/}
              <Button
                onClick={() => { navigate('/garden/produce') }}
                sx={{
                  display: "flex",
                  padding: "6px 16px",
                  gap: "6px",
                  borderRadius: "25px",
                  fontSize: "14px",
                  color: "var(--base_site_MTColorLight, #fffbf8)"
                }}
                variant="text"
              >
                <Typography border-radius="25px">
                  Community Needs
                </Typography>
              </Button>
              <Button
                onClick={() => navigate("/garden/findapantry")}
                sx={{
                  display: "flex",
                  padding: "6px 16px",
                  gap: "6px",
                  borderRadius: "25px",
                  fontSize: "14px",
                  color: "var(--base_site_MTColorLight, #fffbf8)"
                }}
                variant="text"
              >
                <Typography border-radius="25px">
                  Find a Food Pantry
                </Typography>
              </Button>
              <Button
                onClick={() => { navigate('/garden/aboutUs') }}
                sx={{
                  display: "flex",
                  padding: "6px 16px",
                  gap: "6px",
                  borderRadius: "25px",
                  fontSize: "14px",
                  color: "var(--base_site_MTColorLight, #fffbf8)"
                }}
                variant="text"
              >
                <Typography border-radius="25px">
                  About Us
                </Typography>
              </Button>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                  color="inherit"
                  sx={{
                    width: "50px",
                    height: "50px"
                  }}
                >
                  <AccountCircle
                    sx={{
                      width: "50px",
                      height: "50px"
                    }}
                  />
                </IconButton>

                {/** Menu for sign-out option */}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => {
                    navigate("/garden/profile");
                    handleMenuClose();
                  }}>
                    <Typography fontWeight={"700"}>Account</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <Typography fontWeight={"700"}>Sign Out</Typography>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
