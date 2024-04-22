import React from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <>
      <div className="w-100 h-20 bg-slate-100 flex justify-between  items-center px-5 ">
        <div className="flex justify-evenly gap-3">
          <h1> Menus</h1>
          <h2>Logo</h2>
        </div>
        <div className="flex justify-evenly gap-3">
          <h1> Search</h1>
          <h2>Mic</h2>
        </div>
        <div className="flex justify-evenly gap-3">
          <h1>Recording</h1>
          <h1>Notification</h1>
          <h1>user logo</h1>
        </div>
      </div>
      {/* <span className="flex flex-col w-1/6 bg-orange-500">
        <span className="text-xs">Home</span>
        <span className="text-xs">shorts</span>
        <span className="text-xs">Subscriptions</span>
        <span className="text-xs">You</span>
      </span> */}
    </>
  );
};

export default Navbar;
