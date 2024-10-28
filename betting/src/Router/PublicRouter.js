import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";
import SportsTitle from "../Components/SportsTitle/SportsTitle";
import Footer from "../Components/Footer/Footer";
import Home from "../Screens/Home/Home";
import { OddsScreen } from "../Screens/Odds/OddsScreen";

const PublicRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/title/:group" element={<SportsTitle />} />
        <Route path="/" element={<Home />} />
        <Route path="/odds/:key" element={<OddsScreen />} />
      </Routes>
      <Footer />
    </>
  );
};

export default PublicRouter;
