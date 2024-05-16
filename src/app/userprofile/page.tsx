"use client";
import React, { ChangeEvent, useContext, useState } from "react";
import { UserContext } from "../provider";
import Link from "next/link";
import Image from "next/image";
import styles from "./Userprofile.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { dev_url } from "@/url/hosturl";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "postcss";
import { UpdateAvaterType, UpdateCoverImgType } from "../allinterface";

const Profile = () => {
	const [editfullname, setEditFullName] = useState(false);
	const [editcoverimage, setEditCoverImage] = useState(false);
	const [editavatar, setEditAvatar] = useState(false);

	const loggedInUser = useContext(UserContext);

	const [fullName, setFullName] = useState("");
	const [coverformData, setCoverFormData] = useState<UpdateCoverImgType>({
		coverImage: "",
	});
	const [avatarformData, setAvatarFormData] = useState<UpdateAvaterType>({
		avatar: "",
	});
	const [loading, setLoading] = useState(false);
	const [loading2, setLoading2] = useState(false);

	const router = useRouter();
	const updateFullNameHandler = async () => {
		setEditFullName(false);

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
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log("e.target", e.target.name);
		if (e.target.files) {
			if (e.target.name === "coverImage") {
				setCoverFormData({
					...coverformData,
					[e.target.name]: e.target.files[0],
				});
			}
			if (e.target.name === "avatar") {
				setAvatarFormData({
					...avatarformData,
					[e.target.name]: e.target.files[0],
				});
			}
		}
	};
	// const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files) {
	// 		setAvatarFormData({
	// 			...coverformData,
	// 			[e.target.name]: e.target.files[0],
	// 		});
	// 	}
	// };
	const updateCoverImageHandler = async () => {
		setEditCoverImage(false);
		if (coverformData.coverImage !== "") {
			console.log("formdata", coverformData);

			try {
				setLoading(true);

				const formDataToSend = new FormData();
				if (coverformData.coverImage) {
					formDataToSend.append("coverImage", coverformData.coverImage);
				}

				const result = await axios.post(
					`${dev_url}/users/update-coverImage`,
					formDataToSend,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				if (result.data) {
					setLoading(false);

					toast.success("cover image updated");
				}
				console.log("cover Image successfully updated", result);
			} catch (error) {
				console.error("Error while updating cover Image:", error);
			}
		} else {
			alert("please fill the complete form");
		}
	};

	const updateAvatarImageHandler = async () => {
		setEditAvatar(false);
		if (avatarformData.avatar !== "") {
			console.log("formdata", avatarformData);

			try {
				setLoading2(true);

				const formDataToSend = new FormData();
				if (avatarformData.avatar) {
					formDataToSend.append("avatar", avatarformData.avatar);
				}

				const result = await axios.post(
					`${dev_url}/users/update-userAvatar`,
					formDataToSend,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				if (result.data) {
					setLoading2(false);

					toast.success("avatar image updated");
				}
				console.log("Avatar Image successfully updated", result);
			} catch (error) {
				console.error("Error while Avatar  Image:", error);
			}
		} else {
			alert("please fill the complete form");
		}
	};

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
									: "https://placehold.co/1200x450" // Provide a placeholder image URL or adjust as needed
							}
							width={500}
							height={500}
							quality={10}
							alt={"looged in aimage"}
							className={`${styles.coverimage} border  rounded-b rounded-t relative`}
						/>

						<div className={styles.editcoverimg}>
							{editcoverimage ? (
								<>
									<div>
										<div>
											<input
												className={`${styles.coverImage_container_mobile} absolute  right-10  top-2`}
												type="file"
												name="coverImage"
												onChange={handleFileChange}
												placeholder="cover Image"
											/>
										</div>
										<div>
											<button
												className={`${styles.coverImage_container_button} bg-black absolute right-7  text-white p-1 `}
												type="submit"
												onClick={updateCoverImageHandler}
											>
												Update
											</button>
										</div>
									</div>
								</>
							) : (
								<>
									{!loading && (
										<button
											type="button"
											onClick={() => setEditCoverImage(true)}
										>
											<EditIcon />
										</button>
									)}
								</>
							)}
							{loading && (
								<p className="text-center absolute right-10 top-1 bg-white">
									Uploading.....
								</p>
							)}
						</div>
					</div>
					<div className={`${styles.avatarconatainer} `}>
						<Image
							src={
								loggedInUser?.loggedInUser &&
								typeof loggedInUser.loggedInUser.avatar === "string"
									? loggedInUser.loggedInUser.avatar
									: "https://placehold.co/60x60" // Provide a placeholder image URL or adjust as needed
							}
							width={200}
							height={200}
							quality={10}
							alt="looged in aimage"
							className={`${styles.avatar_image}  rounded-full relative border border-black `}
						/>

						{editavatar ? (
							<>
								<input
									className="absolute  top-6   left-6"
									type="file"
									name="avatar"
									onChange={handleFileChange}
									placeholder="avatar Image"
								/>
								<br />
								<button
									className=" bg-black absolute  bottom-10 left-10  text-white p-1 "
									type="submit"
									onClick={updateAvatarImageHandler}
								>
									Update
								</button>
							</>
						) : (
							<>
								{!loading2 && (
									<button
										className="absolute top-5  right-10"
										onClick={() => setEditAvatar(true)}
									>
										<EditIcon />
									</button>
								)}
							</>
						)}
						{loading2 && (
							<p className="text-center absolute right-10 top-1 bg-white">
								Uploading.....
							</p>
						)}
					</div>
					<div className={styles.about_container}>
						{!editfullname ? (
							<>
								<h1 className=" mx-7 text-lg font-semibold">
									{loggedInUser && loggedInUser.loggedInUser?.fullName
										? loggedInUser.loggedInUser?.fullName
										: "null"}
								</h1>
								<div>
									<button onClick={() => setEditFullName(true)}>
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
											onClick={updateFullNameHandler}
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
