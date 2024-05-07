import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./video.module.css";
import { UserContext } from "@/app/provider";
import { VideoType } from "@/app/allinterface";

// const Video = ({ videoData }: VideoType) => {
const Video = ({ videoData }: { videoData: VideoType[] }) => {
	const [date, setDate] = useState(null);
	let loggedInUser = useContext(UserContext);
	const router = useRouter();
	const dateOnVideoUploaded = (createdAt: string) => {
		const uploadDate = new Date(createdAt);
		const month = ("0" + (uploadDate.getMonth() + 1)).slice(-2); // Format month (01 - 12)
		const day = ("0" + uploadDate.getDate()).slice(-2); // Format day (01 - 31)
		return `${month}/${day}`; // Return formatted date (MM/DD)
	};
	const routeToIndividualVideo = (item: VideoType) => {
		router.push(`/video/${item?._id}`);
	};
	return (
		<>
			<div className="flex justify-center flex-wrap align-center ">
				{videoData &&
					videoData?.map((item: VideoType) => {
						return (
							<>
								<div
									className={`${styles.videocontrooler} w-80 h-80 text-center  m-2 p-1  `}
								>
									<video
										// autoPlay
										loop
										muted
										className={` cursor-pointer w-80 h-44 border rounded  `}
										onClick={() => routeToIndividualVideo(item)}
									>
										<source src={item.videoFile} type="video/mp4" />
									</video>

									<div className="flex flex-col border border-black-200 rounded ">
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
											<p className=" text-lg font-medium  text-center ">
												{item.title}
											</p>
										</div>
										<div className="flex flex-col justify-end  items-start   mx-10  text-gray-400 text-sm">
											<p>
												{Array.isArray(item.owner) &&
													item.owner.length > 0 &&
													item.owner[0]?.username}
											</p>

											<div className="flex justify-start gap-2">
												<p> views </p> *
												<p>{dateOnVideoUploaded(item.createdAt)}</p>
											</div>
										</div>
									</div>
									{/* <h1> {item}</h1> */}
								</div>
							</>
						);
					})}
			</div>
		</>
	);
};

export default Video;
