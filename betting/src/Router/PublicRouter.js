import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";
import SportsTitle from "../Components/SportsTitle/SportsTitle";
import Footer from "../Components/Footer/Footer";
import Home from "../Screens/Home/Home";
import { OddsScreen } from "../Screens/Odds/OddsScreen";
import { EventScore } from "../Screens/EventScore/EventScore";
import Login from "../Screens/LoginFlow/Login/Login";
import Register from "../Screens/LoginFlow/Register/Register";
import ForgotPassword from "../Screens/LoginFlow/Forgot/ForgotPassword";
import VerifyOtp from "../Screens/LoginFlow/VerifyOtp/VerifyOtp";
import ResetPassword from "../Screens/LoginFlow/ResetPassword/ResetPassword";
import Profile from "../Screens/Profile/Profile";
import RecentNews from "../Screens/RecentNews/RecentNews";
import ParlayCalculater from "../Screens/Parlay/ParlayCalculater";
import OddsCalculater from "../Screens/Parlay/OddsCalculater";
import BettingHistory from "../Screens/Betting/BettingHistory/BettingHistory";
import LeaguesList from "../Screens/Leagues/LeaguesList";
import CreateLeagues from "../Screens/Leagues/CreateLeagues.js";
import LeagueDetails from "../Screens/Leagues/LeagueDetails.js";
import PrivateRoute from "../Components/PrivateRoute.js";
import ChallangesList from "../Screens/Challanges/ChallangesList.js";
import HedgeCalculater from "../Screens/Parlay/HedgeCalculater.js";
import EvCalculater from "../Screens/Parlay/EvCalculater.js";
import Notification from "../Screens/Notification/Notification.js";

const PublicRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/title/:group" element={<SportsTitle />} />
        <Route path="/" element={<Home />} />
        <Route path="/odds/:key" element={<OddsScreen />} />
        <Route path="/event-score" element={<EventScore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recent-news" element={<RecentNews />} />
        <Route path="/parlay-calculater" element={<ParlayCalculater />} />
        <Route path="/odds-calculater" element={<OddsCalculater />} />
        <Route path="/hedge-calculater" element={<HedgeCalculater />} />
        <Route path="/ev-calculater" element={<EvCalculater />} />
        <Route path="/betting-history" element={<BettingHistory />} />
        <Route path="/leagues-list" element={<LeaguesList />} />
        <Route path="/create-leagues" element={<CreateLeagues />} />
        <Route path="/challanges" element={<ChallangesList />} />
        <Route path="/notification" element={<Notification />} />
        <Route
          path="/league-details/:id/invite/:code/:ids"
          element={
            <PrivateRoute>
              <LeagueDetails />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/league-details/:id/invite/:code"
          element={<LeagueDetails />}
        /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default PublicRouter;
