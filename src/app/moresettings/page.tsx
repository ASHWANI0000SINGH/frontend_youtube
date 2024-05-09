"use client";
import React, { useContext } from "react";
import { UserContext } from "../provider";
import Link from "next/link";
import UseAuth from "@/components/UseAuth";
import { buttonVariants } from "@/components/ui/button";

const MoreSettongs = () => {
	const loggedInUser = useContext(UserContext);
	console.log("logged in user profile", loggedInUser);
	const { allowuser } = UseAuth();

	return (
		<>
			{allowuser ? (
				<div className="text-center mt-2 flex flex-col gap-10 mx-20 p-3 justify-start items-center">
					<div>
						<h1 className="font-bold text-2xl leading-9">
							More Settings {loggedInUser?.loggedInUser?.email}
						</h1>
					</div>
					<div className="changecurrentpassword">
						<Link
							href="/changecurrentpassword"
							className="border border-black w-20 p-3  rounded bg-white text-black"
						>
							Change Current Password
						</Link>
					</div>
					<div className="updateaccdetials">
						<Link
							href="/updateaccdetails"
							className="border border-black w-20 p-3  rounded bg-black text-white"
						>
							update Accout Details
						</Link>
					</div>
					<div className="updateuseravatar">
						<Link
							href="/updateavatar"
							className="border border-black w-20   rounded bg-white text-black p-3"
						>
							update User Avatar
						</Link>
					</div>
					<div className="updateCoverImage">
						<Link
							href="/updatecoverimg"
							className="border border-black w-20 p-3  rounded bg-black text-white"
						>
							update Cover Image
						</Link>
					</div>
				</div>
			) : (
				<>
					<div className=" flex justify-end mx-2 p-5 border-sky-100">
						<div className="m-2">
							<Link
								href="/login"
								className={buttonVariants({ variant: "outline" })}
							>
								Login
							</Link>
						</div>
						<div className="m-2">
							<Link
								href="/signup"
								className={buttonVariants({ variant: "outline" })}
							>
								Signup
							</Link>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default MoreSettongs;
