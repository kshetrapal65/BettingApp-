import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51QJqjRCNMTpLnffXQ6xSsKetMvyhZTcGh9dPMHtK6VONAGTD4ABNFdubmgJkmuv64qOSXLNgjRHBZgwv3OZ5NGFq00np0m539m"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
