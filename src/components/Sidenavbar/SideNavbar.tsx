import React from "react";
import { Button } from "../ui/button";

const SideNavbar = () => {
  return (
    <>
      <div className=" w-1/12 h-screen bg-slate-50  flex  flex-col justify-start   px-5 gap-y-10  justify-items-center">
        <div className=" ">
          <p className="text-xs">Home</p>
        </div>
        <div className="  ">
          <p className="text-xs">shorts</p>
        </div>
        <div className=" ">
          <p className="text-xs">Subscriptions</p>
        </div>
        <div className=" ">
          <p className="text-xs">You</p>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
