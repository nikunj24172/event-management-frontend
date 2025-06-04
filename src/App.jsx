import React from "react";
import AdminPanel from "./components/AdminPanel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEvents from "./components/AddEvents";
import { ToastContainer } from "react-toastify";
import EditEvents from "./components/EditEvents";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/add-event" element={<AddEvents />} />
        <Route path="/edit/:id" element={<EditEvents />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
