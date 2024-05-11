"use client";
import React, { useContext } from "react";
import { UserContext } from "../provider";
import Link from "next/link";
import Image from "next/image";
import styles from "./Userprofile.module.css";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
	const loggedInUser = useContext(UserContext);
	console.log("logged in user profile", loggedInUser);
	return (
		<>
			{/* <div className="flex flex-col    text-start mx-20 p-10 justify-start ">
        <div>
          <h5 className="font-bold">Account</h5>
          <p className="text-xl font-medium mt-6">
            Choose how you appear and what you see on YouTube
          </p>
          <p className="text-sm font-light mt-2">
            Signed in as {loggedInUser?.loggedInUser?.username}
          </p>
        </div>
        <hr />
        <div className="youtube-chaneel mt-6">
          <h5 className="font-bold">Your Youtube Channel</h5>
          <p className="text-sm font-light mt-2">
            This is your public presence on YouTube. You need a channel to
            upload your own videos, comment on videos, or create playlists.
          </p>
          <div className="mt-4 flex justify-start gap-20">
            <h5 className="font-bold"> Your Channel</h5>
            <div>
              <img
                src={
                  typeof loggedInUser?.loggedInUser?.avatar === "string"
                    ? loggedInUser.loggedInUser.avatar
                    : ""
                }
                alt=""
                className=" w-6 h-6 rounded-full  "
              />
              <h5 className="text-md font-medium">
                {loggedInUser?.loggedInUser?.username}
              </h5>
            </div>
          </div>
        </div>
        <hr />
        <div className="your-account mt-6">
          <h5 className="font-bold">Your account</h5>

          <p className="text-sm font-light mt-2">
            You sign in to YouTube with your Google Account
          </p>
        </div>
        <div className="mt-5">
          <h5 className="font-bold">
            More settings for {loggedInUser?.loggedInUser?.email}
          </h5>
          <div className="mt-2">
            <Link
              href="/moresettings"
              className="border border-black w-20 p-1  rounded bg-black text-white"
            >
              More Settings
            </Link>
          </div>
        </div>
      </div> */}
			<div className="flex  w-full  justify-evenly p-6  ">
				<div
					className={`${styles.cover_conatiner}flex justify-center  align-center  flex-col border `}
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
						<h1 className=" mx-7 text-lg font-semibold">
							{loggedInUser?.loggedInUser?.fullName}
						</h1>
						<div>
							<button>
								<EditIcon />
							</button>
						</div>
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
						<button>
							<EditIcon />
						</button>
					</div>
					<div className="flex justify-between  p-2 border  border-b-gray-300 text-center">
						<h1> More Settings</h1>
						<button>
							<EditIcon />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
