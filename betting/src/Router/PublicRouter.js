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
      </Routes>
      <Footer />
    </>
  );
};

export default PublicRouter;
