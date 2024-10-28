import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import PublicRouter from "./Router/PublicRouter";

function App() {
  return (
    <>
      <BrowserRouter basename="/betting">
        <PublicRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
