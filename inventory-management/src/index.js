import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./components/app/App";

const element = (

  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
ReactDOM.render(element,
  document.getElementById("root")
);
