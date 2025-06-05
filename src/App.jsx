import React from "react";
import AdminPanel from "./components/AdminPanel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEvents from "./components/AddEvents";
import { ToastContainer } from "react-toastify";
import EditEvents from "./components/EditEvents";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={() =>
          "inline-flex min-w-[280px] max-w-[90%] sm:max-w-sm md:max-w-md bg-white text-gray-800 dark:bg-gray-800 dark:text-white px-3 py-2 rounded-lg shadow-md text-xs sm:text-sm border border-gray-300"
        }
        bodyClassName="flex items-center"
        className="z-50"
      />
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/add-event" element={<AddEvents />} />
        <Route path="/edit/:id" element={<EditEvents />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
