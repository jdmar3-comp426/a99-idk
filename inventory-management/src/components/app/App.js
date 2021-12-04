import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../login/Login";
import Inventory from "../inventory/Inventory";
import Register from "../register/Register";
import Profile from "../profile/Profile";


//Define App component to display and manage a table of inventory items (editable and read only rows)
// and provides a form for adding new inventory items

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={Login()} />
        <Route path="/inventory" element={Inventory()} />
        <Route path="/register" element={Register()} />
        <Route path="/profile" element={Profile()} />
      </Routes>
    </div>
  )
};

export default App;
