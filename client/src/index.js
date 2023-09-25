import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001/proyectoPKMN";
axios.defaults.baseURL =
  "pi-pokemon-deploy-production-75eb.up.railway.app/proyectoPKMN";

const root = createRoot(document.getElementById("root")); // Create a root using createRoot

root.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
);
