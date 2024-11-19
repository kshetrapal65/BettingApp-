import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import PublicRouter from "./Router/PublicRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <PublicRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
