"use client";
import React, { useContext, useState } from "react";
import { UserContext } from "../provider";
import Link from "next/link";
import Image from "next/image";
import styles from "./Userprofile.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { dev_url } from "@/url/hosturl";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profile = () => {
	const [chnagefullName, setChangeFullName] = useState(false);
	const loggedInUser = useContext(UserContext);

	const [fullName, setFullName] = useState("");

	const formSubmitHandler = async () => {
		setChangeFullName(false);

		if (fullName !== "") {
			try {
				console.log("fullname", fullName);
				const result = await axios.post(
					`${dev_url}/users/updateFullName`,
					{ fullName },
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				toast.success("Full Name Updated");
				console.log("Full Name Updated", result.data);
				setFullName("");
			} catch (error) {
				console.error("Error While Full Name Updated:", error);
			}
		} else {
			console.log("formdata", fullName);
			alert("please fill the complete form");
		}
	};
	const router = useRouter();

	const gotochnageMoreSettingsPage = () => {
		router.push("/updateaccdetails");
	};
	const gotochnagePassword = () => {
		router.push("/changecurrentpassword");
	};
	return (
		<>
			<div
				className={`${styles.userprofile_container} flex  w-full  justify-evenly p-6  `}
			>
				<div
					className={`${styles.cover_conatiner} flex justify-center  align-center  flex-col border `}
				>
					<div className="w-full realtive">
						<Image
							src={
								loggedInUser?.loggedInUser &&
								typeof loggedInUser.loggedInUser.coverImage === "string"
									? loggedInUser.loggedInUser.coverImage
									: "/placeholder.jpg" // Provide a placeholder image URL or adjust as needed
							}
							width={500}
							height={500}
							quality={10}
							alt="looged in aimage"
							className={`${styles.coverimage} border  rounded-b rounded-t`}
						/>
						<div className={styles.editcoverimg}>
							<button>
								<EditIcon />
							</button>
						</div>
					</div>
					<div className={styles.avatarconatainer}>
						<Image
							src={
								loggedInUser?.loggedInUser &&
								typeof loggedInUser.loggedInUser.avatar === "string"
									? loggedInUser.loggedInUser.avatar
									: "/placeholder.jpg" // Provide a placeholder image URL or adjust as needed
							}
							width={500}
							height={500}
							quality={10}
							alt="looged in aimage"
							className="w-40 h-40  rounded-full"
						/>
					</div>
					<div className={styles.about_container}>
						{!chnagefullName ? (
							<>
								<h1 className=" mx-7 text-lg font-semibold">
									{loggedInUser?.loggedInUser?.fullName}
								</h1>
								<div>
									<button onClick={() => setChangeFullName(true)}>
										<EditIcon />
									</button>
								</div>
							</>
						) : (
							<>
								<div
									className={`${styles.full_name_conatiner} flex justify-between  w-full`}
								>
									<div>
										<input
											type="text"
											placeholder="update full name "
											className="mx-7 text-lg "
											onChange={(e) => setFullName(e.target.value)}
										/>
									</div>
									<div>
										<button
											onClick={formSubmitHandler}
											className="bg-black text-white p-1"
										>
											Submit
										</button>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<div
					className={`${styles.moresetting_container} mx-2 border border-black w-60 `}
				>
					<div className="border border-b-gray-300 p-2">
						<h1> Profile Language</h1>
						<h1 className="font-light text-sm"> English</h1>
					</div>
					<div className="flex justify-between  p-2 border  border-b-gray-300 text-center">
						<h1> Change Passowrd</h1>
						<button onClick={gotochnagePassword}>
							<EditIcon />
						</button>
					</div>
					<div className="flex justify-between  p-2 border  border-b-gray-300 text-center">
						<h1> More Settings</h1>
						<button onClick={gotochnageMoreSettingsPage}>
							<EditIcon />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
