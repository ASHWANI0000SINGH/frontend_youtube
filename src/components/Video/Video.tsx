import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./video.module.css";
import { UserContext } from "@/app/provider";
import { VideoType } from "@/app/allinterface";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DoneIcon from "@mui/icons-material/Done";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// const Video = ({ videoData }: VideoType) => {
const Video: React.FC<{
	videoData: VideoType[];
	isLoading: boolean;
	isError: boolean;
}> = ({ videoData, isLoading, isError }) => {
	let loggedInUser = useContext(UserContext);
	const router = useRouter();
	const dateOnVideoUploaded = (createdAt: string) => {
		const uploadDate = new Date(createdAt);
		const month = ("0" + (uploadDate.getMonth() + 1)).slice(-2); // Format month (01 - 12)
		const day = ("0" + uploadDate.getDate()).slice(-2); // Format day (01 - 31)
		return `${month}/${day}`; // Return formatted date (MM/DD)
	};
	const routeToIndividualVideo = (item: VideoType) => {
		if (!loggedInUser?.loggedInUser) {
			toast.error("Please Login to watch "); // Displays a error message
		} else {
			router.push(`/video/${item?._id}`);
		}
	};
	const handleMouseEnter = (
		e: React.MouseEvent<HTMLVideoElement, MouseEvent>
	) => {
		const vid = e.target as HTMLVideoElement;
		// console.log("video on leave", vid.currentTime);
		// console.log("video duration", vid.duration);

		vid.muted = true;
		vid.defaultMuted = true;
		vid.play();
		vid.controls = true;
	};
	const handleMouseLeave = (
		e: React.MouseEvent<HTMLVideoElement, MouseEvent>
	) => {
		const vid = e.target as HTMLVideoElement;
		// console.log("video on leave", vid.currentTime);
		vid.muted = false;
		vid.defaultMuted = false;

		vid.pause();
		vid.controls = false;
	};
	if (isLoading) {
		return <p className="text-center">Loading ...</p>;
	}
	if (isError) {
		return (
			<p className="text-center bg-danger">Error while loading video...</p>
		);
	}

	return (
		<>
			<div
				className={`${styles.video_container} flex justify-center flex-wrap align-center `}
			>
				{videoData &&
					videoData?.map((item: VideoType) => {
						return (
							<>
								<div
									className={`${styles.videocontrooler}  text-center  m-2 p-2 cursor-pointer `}
									onClick={() => routeToIndividualVideo(item)}
								>
									<video
										loop
										muted
										className={`${styles.video}  cursor-pointer  `}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
										// controls
										// playsInline
									>
										<source
											src={item.videoFile}
											type="video/mp4"
											className={styles.videosrc}
										/>
									</video>

									<div className={styles.vediodetials_container}>
										<div
											className={`${styles.videodetails_alignment} flex flex-row  justify-between `}
										>
											<div className="flex justify-start ">
												<Image
													src={
														videoData &&
														item.owner &&
														Array.isArray(item.owner) &&
														typeof item.owner[0].avatar === "string"
															? item.owner[0].avatar
															: "/placeholder.jpg" // Provide a placeholder image URL or adjust as needed
													}
													width={500}
													height={500}
													quality={10}
													alt="User Avatar"
													className=" w-10 h-10 rounded-full p-1 text-center "
												/>
												<p className={`${styles.video_title} m-1 `}>
													{item.title}
												</p>
											</div>
											<div className="">
												<button>
													<MoreVertIcon className=" mt-1" />
												</button>
											</div>
										</div>

										<div className="  flex  justify-start     mx-10  text-gray-400 text-sm">
											<div className="flex">
												<p>
													{Array.isArray(item.owner) &&
														item.owner.length > 0 &&
														item.owner[0]?.username}
												</p>
												<span className="text-center mx-1">
													<DoneIcon className={styles.autorizeduser} />
												</span>
											</div>

											<div className="flex justify-start gap-2">
												<p> 101k views </p>{" "}
												<span>
													<FiberManualRecordIcon className={`${styles.dot}`} />
												</span>
												<p>{dateOnVideoUploaded(item.createdAt)}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						);
					})}
			</div>
		</>
	);
};

export default Video;
