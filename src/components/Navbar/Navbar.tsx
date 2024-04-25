import React from "react";
import { Button } from "../ui/button";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import EmergencyRecordingIcon from "@mui/icons-material/EmergencyRecording";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Face6Icon from "@mui/icons-material/Face6";

const Navbar = () => {
  return (
    <>
      <div className="w-100 h-20  flex justify-between  items-center px-5 sticky ">
        <div className="flex justify-evenly gap-3 sticky">
          <h1>
            {" "}
            <MenuIcon />
          </h1>
          <h2>Logo</h2>
        </div>
        <div className="flex justify-evenly gap-3">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className=" border border-black  rounded-r-full rounded-l-full w-96 h-8  p-2"
          />
          <h2>
            <SettingsVoiceIcon />
          </h2>
        </div>
        <div className="flex justify-evenly gap-3">
          <h1>
            <EmergencyRecordingIcon />
          </h1>
          <h1>
            <NotificationsNoneIcon />
          </h1>
          <h1>
            <Face6Icon />
          </h1>
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
