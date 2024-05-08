"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import style from "./sidenavbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/provider";
import Replay30SharpIcon from "@mui/icons-material/Replay30Sharp";

const SideNavbar = () => {
	const router = useRouter();

	let loggedInUser = useContext(UserContext);
	const gotoHome = () => {
		router.push("/");
	};
	return (
		<>
			{!loggedInUser !== null && (
				<div className={`${style.sidenav}  p-3 `}>
					<div className={`${style.home_icon}  p-1`}>
						<HomeIcon onClick={gotoHome} type="button" /> <br />
						<p className="text-center">Home</p>
					</div>
					<div className=" m-2 ">
						<Replay30SharpIcon /> <br />
						<p className="">Shorts</p>
					</div>

					<div className=" m-2 ">
						<SubscriptionsIcon /> <br />
						<p className="text-wrap text-center">Subscriptions</p>
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
