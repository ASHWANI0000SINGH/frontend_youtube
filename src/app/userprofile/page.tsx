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
import LogoutIcon from "@mui/icons-material/Logout";
import UseAuth from "@/components/UseAuth";
import EditModal from "@/components/EditModal/EditModal";
import EditModal2 from "@/components/EditModal/EditModal2";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
	updateAvatar,
	updateCoverImage,
	updateFullName,
} from "@/redux/features/authSlice";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const Profile = () => {
	const [editfullname, setEditFullName] = useState(false);
	const [editcoverimage, setEditCoverImage] = useState(false);
	const [editavatar, setEditAvatar] = useState(false);
	const dispatch = useDispatch();
	const loggedInUser = useContext(UserContext);
	const authState = useAppSelector((state) => state.auth.loggedInUser);

	const [fullName, setFullName] = useState("");
	const [coverformData, setCoverFormData] = useState<UpdateCoverImgType>({
		coverImage: "",
	});
	const [avatarformData, setAvatarFormData] = useState<UpdateAvaterType>({
		avatar: "",
	});
	const { allowuser, setAllowUser } = UseAuth();

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
				console.log("result", result.data.data.fullName);
				console.log("Full Name Updated", result.data.data.fullName);
				console.log("type of full name", result.data.data.fullName);
				dispatch(updateFullName(result.data.data.fullName));

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
		console.log("e.target from chnage Gandler", e.target.name);
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

	const updateCoverImageHandler = async () => {
		console.log("update cover image");
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
					dispatch(updateCoverImage(result.data.data.coverImage));

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
				// if (result.data) {
				if (result.data.data.avatar) {
					setLoading2(false);
					dispatch(updateAvatar(result.data.data.avatar));

					toast.success("avatar image updated");
					console.log("result avatar", result.data.data.avatar);
				}
			} catch (error) {
				console.error("Error while Avatar  Image:", error);
			}
		} else {
			alert("please fill the complete form");
		}
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

	const gotochnageMoreSettingsPage = () => {
		router.push("/updateaccdetails");
	};
	const gotochnagePassword = () => {
		router.push("/changecurrentpassword");
	};
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditButtonClickcover = () => {
		setEditCoverImage(true);
	};

	const handleCloseModalCover = () => {
		setEditCoverImage(false);
	};

	const handleEditButtonClickAvatar = () => {
		console.log("clicked avatar");
		setEditAvatar(true);
	};

	const handleCloseModalAvatar = () => {
		setEditAvatar(false);
	};

	return (
		<>
			<div
				className={`${styles.userprofile_container} flex  w-full  justify-evenly p-6  `}
			>
				<div
					className={`${styles.cover_conatiner} flex justify-center  align-center  flex-col border `}
				>
					<div className="w-full realtive ">
						{loading !== true ? (
							<>
								<Image
									src={
										authState && typeof authState.coverImage === "string"
											? authState.coverImage
											: "https://placehold.co/1200x450" // Provide a placeholder image URL or adjust as needed
									}
									width={500}
									height={500}
									quality={10}
									alt={"looged in aimage"}
									className={`${styles.coverimage} border  rounded-b rounded-t relative`}
								/>
							</>
						) : (
							<>
								<div
									className={`${styles.coverimage} border  rounded-b rounded-t  text-center flex `}
								>
									<div className=" m-auto">
										<LoadingSpinner />
									</div>
								</div>
							</>
						)}

						<div className={styles.editcoverimg}>
							{/* <div className="absolute top-1  bg-red-200  "> */}
							<button
								className="text-center bg-white border border-black "
								onClick={handleEditButtonClickcover}
							>
								<EditIcon />
							</button>
							{editcoverimage && (
								<EditModal
									onClose={handleCloseModalCover}
									changehandler={handleFileChange}
									submitHandler={updateCoverImageHandler}
									coverImage={"coverImage"}
								/>
							)}
						</div>

						<div className={`${styles.avatarconatainer} `}>
							{loading2 !== true ? (
								<>
									<button
										className={styles.editavatarImage}
										onClick={handleEditButtonClickAvatar}
									>
										<Image
											src={
												authState && typeof authState.avatar === "string"
													? authState.avatar
													: "https://placehold.co/60x60" // Provide a placeholder image URL or adjust as needed
											}
											width={200}
											height={200}
											quality={10}
											alt="looged in aimage"
											className={`${styles.avatar_image}  rounded-full relative border border-black `}
										/>
									</button>
								</>
							) : (
								<>
									<div
										className={`${styles.avatar_image} rounded-full relative border border-black  flex`}
									>
										<div className=" m-auto">
											<LoadingSpinner />
										</div>
									</div>
								</>
							)}

							{/* <div className={styles.editavatarImage}>
								<button
									className="bg-white"
									onClick={handleEditButtonClickAvatar}
								>
									<EditIcon />
								</button>
							</div> */}
							{editavatar && (
								<EditModal2
									onClose={handleCloseModalAvatar}
									changehandler={handleFileChange}
									submitHandler={updateAvatarImageHandler}
									avatar={"avatar"}
								/>
							)}
						</div>
					</div>
					{/* <div className={`${styles.avatarconatainer} `}>
						{loading2 !== true ? (
							<>
								<Image
									src={
										authState && typeof authState.avatar === "string"
											? authState.avatar
											: "https://placehold.co/60x60" // Provide a placeholder image URL or adjust as needed
									}
									width={200}
									height={200}
									quality={10}
									alt="looged in aimage"
									className={`${styles.avatar_image}  rounded-full relative border border-black `}
								/>
							</>
						) : (
							<>
								<div
									className={`${styles.avatar_image} rounded-full relative border border-black  flex`}
								>
									
									<div className=" m-auto">
										<LoadingSpinner />
									</div>
								</div>
							</>
						)}

						<div className={styles.editavatarImage}>
							<button
								className="bg-white"
								onClick={handleEditButtonClickAvatar}
							>
								<EditIcon />
							</button>
						</div>
						{editavatar && (
							<EditModal2
								onClose={handleCloseModalAvatar}
								changehandler={handleFileChange}
								submitHandler={updateAvatarImageHandler}
								avatar={"avatar"}
							/>
						)}
					</div> */}
					<div className={styles.about_container}>
						{!editfullname ? (
							<>
								<h1 className=" mx-7 text-lg font-semibold">
									{authState && authState?.fullName
										? authState?.fullName
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

					<div
						onClick={logoutHandler}
						className={`${styles.tooltiplogout}  text-xs  bg-red-500 text-white  p-2 border  border-b-gray-300 text-center cursor-pointer`}
					>
						{/* <button> */}
						<LogoutIcon />
						{/* </button> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
