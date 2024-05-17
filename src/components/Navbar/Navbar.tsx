"use client";
import React, { useContext, useState } from "react";
import { buttonVariants } from "../ui/button";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import EmergencyRecordingIcon from "@mui/icons-material/EmergencyRecording";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/provider";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { dev_url } from "@/url/hosturl";
import { toast } from "react-hot-toast";
import UseAuth from "../UseAuth";

const Navbar = () => {
	const [showBottomProfile, setShowBottomProfile] = useState(false);
	const router = useRouter();
	const loggedInUser = useContext(UserContext);
	const { allowuser, setAllowUser } = UseAuth();
	// console.log("allow user from nav", allowuser);

	const gotoProfile = () => {
		// console.log("go to clicked");

		router.push("/userprofile");
	};

	const gotToVideoPage = () => {
		router.push("/videoupload");
	};

	const logoutHandler = async () => {
		// console.log("logout checking..");
		try {
			const result = await axios.post(
				`${dev_url}/users/logout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			if (result.data) {
				localStorage.clear();
				setAllowUser(false);
				// router.push("/");

				toast.success("Succesfully Logged out"); // Displays a success message
				window.location.href = "/";
			}
			// console.log("Logged out", result.data);
		} catch (error) {
			console.error("Error while logging out:", error);
		}
	};

	return (
		<>
			<div className="flex flex-col w-full sticky top-0 z-50">
				<div className="w-full h-20 bg-white flex justify-between items-center px-5 sticky top-0 z-50">
					<div className="flex justify-evenly gap-3 mx-4">
						<h1>
							<MenuIcon />
						</h1>
						<h2>Logo</h2>
					</div>
					<div
						className={`${styles.search_box_container} flex gap-4  place-items-center`}
					>
						<div
							className={`${styles.navbar_container} flex justify-evenly  relative`}
						>
							<input
								type="text"
								name=""
								id=""
								placeholder="Search"
								className={`${styles.navbar}   p-2`}
							/>
							<div className={styles.icon_conatiner}>
								<button>
									<SearchIcon className={styles.search_icon} />
								</button>
							</div>
						</div>
						<div className={`${styles.mic_container} text-center w-10 h-6`}>
							<SettingsVoiceIcon className={styles.mic} />
						</div>
					</div>
					{allowuser ? (
						<>
							<div className="flex justify-evenly gap-3">
								<div className="cursor-pointer">
									<EmergencyRecordingIcon onClick={gotToVideoPage} />
								</div>
								<div>
									<NotificationsNoneIcon />
								</div>
								<div className="cursor-pointer w-10">
									<Image
										src={
											loggedInUser?.loggedInUser &&
											typeof loggedInUser.loggedInUser.avatar === "string"
												? loggedInUser.loggedInUser.avatar
												: "https://placehold.co/20x20" // Provide a placeholder image URL or adjust as needed
										}
										width={800}
										height={500}
										quality={10}
										alt="logo in aimage"
										className="w-6 h-6 rounded-full"
										onClick={() => setShowBottomProfile(!showBottomProfile)}
									/>
									{showBottomProfile && (
										<div className={`absolute ml-3 `}>
											<div
												className={`${styles.tooltipprofile}  text-xs p-1 relative   bg-white text-black  border-black rounded-full text-center`}
											>
												<AccountCircleIcon
													// className="text-xl"
													onClick={gotoProfile}
												/>
											</div>
											{/* <div
												className={`${styles.tooltiplogout}  text-xs p-1   text-red-400   border-black rounded-full text-center`}
											>
												<LogoutIcon onClick={logoutHandler} />
											</div> */}
										</div>
									)}
								</div>
							</div>
						</>
					) : (
						<>
							<Link
								href="/login"
								className={buttonVariants({ variant: "outline" })}
							>
								Login
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Navbar;
