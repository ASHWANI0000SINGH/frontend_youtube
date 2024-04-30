"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import style from "./sidenavbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/provider";

const SideNavbar = () => {
  const router = useRouter();

  let loggedInUser = useContext(UserContext);
  console.log("logged in user from navbar", loggedInUser);
  const gotoHome = () => {
    router.push("/");
  };
  return (
    <>
      {!loggedInUser !== null && (
        <div className={style.sidenav}>
          <div className={`${style.home_icon} m-2`}>
            <HomeIcon onClick={gotoHome} type="button" /> <br />
            <p className="text-center">Home</p>
          </div>
          <div className=" m-2 ">
            <SubscriptionsIcon /> <br />
            <p className="">shorts</p>
          </div>

          <div className=" m-2 ">
            <SubscriptionsIcon /> <br />
            <p className="text-wrap">Subscriptions</p>
          </div>

          <div className=" m-2">
            <YouTubeIcon /> <br />
            <p className="text-center">You</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SideNavbar;
