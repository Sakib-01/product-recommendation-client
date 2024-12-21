import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";

const Main = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="min-h-[calc(100vh-306px)] mt-10">
        <Outlet />
      </div>
      {/* Footer */}
    </div>
  );
};

export default Main;
