//Whenever you need to add a new page to the website, make sure you import the page's variable and say the file path
//Additionally, you need to add a route in the return section on line 63

import DefaultScaffold from "./components/layout/default-scaffold";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Homepage } from "./views/homepage";
import { ErrorPage } from "./components/error-page";
import { GardenerRegister } from "./views/gardener/gardener-register";
import { GardenerProduce } from "./views/gardener/gardener-produce";
import { GardenerProfile } from "./views/gardener/gardener-profile";

import { OptInLandingPage } from "./views/gardener/gardener-optInOut";
//import { JoinTeamsPage } from "./views/gardener/gardener-joinTeams";
import { GettingStartedPage } from "./views/gardener/gardener-gettingstarted";
//import { FormTeamPage } from "./views/gardener/gardener-formTeam";
//import { JoinPoolPage } from "./views/gardener/gardener-joinPool";
import { Leaderboard } from "./views/gardener/leaderboard";
import { Badges } from "./views/gardener/gardener-badges";
import { AboutUs } from "./views/gardener/aboutUs";


import { UserLandingPage } from "./views/gardener/user-landing";
import { DonationPage } from "./views/gardener/donation-page";
import DashboardPage from "./views/dashboard";
import AdminPage from "views/admin";
import { store } from "./state/store";
import { PatronProduce } from "./views/patron/patron-produce";
import { SignIn } from "./components/designs/signin";
import { saveState } from "./localStorage";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { ForgotPassword } from "components/designs/forgot-password";
import { ResetPassword } from "components/designs/reset-password";
import { FoodPantryFinder } from "views/gardener/gardener-find-a-pantry";
import { useState, useEffect } from "react";
import { FoodBankAdminRegister } from "views/foodbank/foodbank-register";
import { FoodbankProduce } from "views/foodbank/foodbank-produce";
import { setAuth } from "state/slices/user-slice";

export const App = () => {
  store.subscribe(() => {
    saveState({
      userInfo: store.getState().userInfo,
    });
  });
  saveState({ userInfo: store.getState().userInfo });

  const userInfo = useAppSelector((state: any) => state.userInfo);

  const [gardenAuthorized, setGardenAuthorized] = useState(false);
  const [foodBankAuthorized, setFoodBankAuthorized] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userInfo.gardenAuthorized === undefined || userInfo.foodBankAuthorized === undefined) {
      localStorage.clear();
      dispatch(
        setAuth({ authToken: "", gardenAuthorized: false, foodBankAuthorized: false, userObj: { id: null, email: "" } })
      );
      window.location.href = "/";
    }
    setGardenAuthorized(userInfo.gardenAuthorized);
    setFoodBankAuthorized(userInfo.foodBankAuthorized);
  }, [userInfo, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultScaffold noSpaceAboveFooter={true}>
              <Homepage />
            </DefaultScaffold>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="*"
          element={
            <DefaultScaffold noSpaceAboveFooter={true}>
              <Homepage />
            </DefaultScaffold>
          }
          errorElement={<ErrorPage />}
        />
        {/*The start of a new path*/}
        <Route
          path="/patron/produce"
          element={
            <DefaultScaffold longPage={true}>
              <PatronProduce />
            </DefaultScaffold>
          }
        />
        {/*The end of a new path, copy this and replace the pathing you need*/}
        <Route
          path="/garden/aboutUs" 
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <AboutUs />
            </DefaultScaffold>
          }
        />
        <Route
          path="/foodbank-admin-register/:token"
          element={
            <DefaultScaffold shortPage={true}>
              <FoodBankAdminRegister />
            </DefaultScaffold>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/reset-password/:id/:token"
          element={
            <DefaultScaffold shortPage={true}>
              <ResetPassword />
            </DefaultScaffold>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/sign-in"
          element={
            <DefaultScaffold noSpaceAboveFooter={true}>
              <SignIn />
            </DefaultScaffold>
          }
        />
        <Route
          path="/sign-in/forgot"
          element={
            <DefaultScaffold shortPage={true}>
              <ForgotPassword />
            </DefaultScaffold>
          }
        />
        <Route
          path="/sign-in/register"
          element={
            <DefaultScaffold shortPage={true}>
              <GardenerRegister />
            </DefaultScaffold>
          }
        />
        <Route
          path="/garden/findapantry"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized} shortPage={true}> {/*You can also make it so only certain account types can interact with the page, here only gardeners can interact with this page*/}
              <FoodPantryFinder />
            </DefaultScaffold>
          }
        />
        <Route
          path="/garden/produce"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized} longPage={true}>
              <GardenerProduce />
            </DefaultScaffold>
          }
        />
        <Route
          path="/garden/profile"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <GardenerProfile />
            </DefaultScaffold>
          }
        />
        <Route
          path="/garden/user-landing"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <UserLandingPage />
            </DefaultScaffold>
          }
        />
        <Route
          path="/garden/opt-in-game" // Cameron changed this so it included the gardener's id in the username. the original line of code was: path="/garden/opt-in-teams" 
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <OptInLandingPage />
            </DefaultScaffold>
          }
        /> 

{/* (use shift+alt+a to uncomment this, also delete the stuff in these parenthesis)        <Route
          path="/garden/form-team"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <FormTeamPage />
            </DefaultScaffold>
          }
        /> */}

        <Route
          path="/garden/gettingstarted"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <GettingStartedPage />
            </DefaultScaffold>
          }
        />

{/*         <Route
          path="/garden/join-teams"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <JoinTeamsPage />
            </DefaultScaffold>
          }
        /> */}

{/*           <Route
          path="/garden/join-pool"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <JoinPoolPage />
            </DefaultScaffold>
          }
        /> */}

        <Route
          path="/garden/donation-page"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <DonationPage />
            </DefaultScaffold>
          }
        />
        <Route
          path="/garden/leaderboard"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <Leaderboard />
            </DefaultScaffold>
          }
        />
        <Route
          path="/garden/dashboard"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <DashboardPage />
            </DefaultScaffold>
          }
        />
        <Route
          path="/garden/badges"
          element={
            <DefaultScaffold authType="gardener" authorized={gardenAuthorized}>
              <Badges />
            </DefaultScaffold>
          }
        />
        <Route
          path="/foodbank/produce"
          element={
            <DefaultScaffold authType="foodBankAdmin" authorized={foodBankAuthorized}>
              <FoodbankProduce />
            </DefaultScaffold>
          }
        />
        <Route
          path="/foodbank/admin"
          element={
            <DefaultScaffold authType="foodBankAdmin" authorized={foodBankAuthorized}>
              <AdminPage />
            </DefaultScaffold>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

