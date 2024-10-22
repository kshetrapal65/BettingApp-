import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";

const PublicRouter = () => {
  return (
    <>
      <Header />
      <Routes>{/* <Route path="/" element={< />} /> */}</Routes>
    </>
  );
};

export default PublicRouter;
