"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import EmergencyRecordingIcon from "@mui/icons-material/EmergencyRecording";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Face6Icon from "@mui/icons-material/Face6";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import { FormDataType } from "@/app/(auth)/signup/page";
import { UserContext } from "@/app/provider";

const Navbar = () => {
  const router = useRouter();
  let loggedInUser = useContext(UserContext);
  console.log("logged in user from navbar", loggedInUser);

  const gotoProfile = () => {
    router.push("/userprofile");
  };

  return (
    <>
      {!loggedInUser !== null && (
        <div className="flex flex-col w-full sticky top-0 z-50">
          <div className="w-full h-20 bg-white flex justify-between items-center px-5 sticky top-0 z-50">
            <div className="flex justify-evenly gap-3">
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
              <div>
                <EmergencyRecordingIcon />
              </div>
              <div>
                <NotificationsNoneIcon />
              </div>
              <div className="cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={loggedInUser?.avatar}
                  alt=""
                  className=" w-6 h-6 rounded-full  "
                  onClick={gotoProfile}
                />
                {/* <Face6Icon onClick={gotoProfile} /> */}
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col   ">
          <div className={`${styles.navbar_box} flex justify-center gap-10 `}>
            <button
              className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
            >
              All
            </button>
            <button
              className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
            >
              News
            </button>
            <button
              className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
            >
              Computer Programming
            </button>

            <button
              className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
            >
              Resmues
            </button>
            <button
              className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
            >
              Music
            </button>
            <button
              className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
            >
              Live
            </button>
            <button
              className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
            >
              Stocks
            </button>
            <button
              className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
            >
              {">"}
            </button>
          </div>
        </div> */}
        </div>
      )}
    </>
  );
};

export default Navbar;
