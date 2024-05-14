"use client";

import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { VideoType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";
import styles from "./video.module.css";
const VideoPage = () => {
	const [videodata, setVideoData] = useState<VideoType | null>(null);
	const [uservideodata, setUserVideoData] = useState<VideoType[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const params = useParams<{
		[x: string]: any;
		tag: string;
		item: string;
	}>();

	useEffect(() => {
		const fetchVideoById = async () => {
			try {
				const result = await axios.get(
					`${dev_url}/video/fetch-byId/${params.id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				console.log("video by id", result);
				setVideoData(result.data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching video by id:", error);
			}
		};
		fetchVideoById();
	}, [params.id]);

	useEffect(() => {
		const fetchUserVideos = async () => {
			try {
				const result = await axios.get(
					`${dev_url}/video/fetch-user-video/${params.id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				console.log("users videos", result.data);
				setUserVideoData(result.data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user videos:", error);
			}
		};
		fetchUserVideos();
	}, [params.id]);

	if (loading) {
		return <p className="text-center">Loading...</p>;
	}

	const dateOnVideoUploaded = (createdAt: string) => {
		const uploadDate = new Date(createdAt);
		const month = ("0" + (uploadDate.getMonth() + 1)).slice(-2);
		const day = ("0" + uploadDate.getDate()).slice(-2);
		return `${month}/${day}`;
	};

	const routeToIndividualVideo = (item: VideoType) => {
		router.push(`/video/${item?._id}`);
	};

	return (
		<>
			<div
				className={`${styles.single_video_conatiner} flex mx-20 p-4  justify-between`}
			>
				<div className="text-center margin-auto">
					{videodata && (
						<video
							autoPlay
							loop
							muted
							controls
							className={`${styles.video} h-2/3 rounded`}
						>
							<source src={videodata.videoFile} type="video/mp4" />
						</video>
					)}
					<div
						className={`${styles.video_details} lex flex-col border border-black-200 rounded`}
					>
						<div>
							<h1 className="text-lg font-medium text-start">
								{videodata?.title}
							</h1>
							<div className="flex justify-between self-center">
								<div className="flex justify-start gap-2 self-center">
									<Image
										src={
											videodata &&
											!Array.isArray(videodata.owner) &&
											typeof videodata.owner.avatar === "string"
												? videodata.owner.avatar
												: "/placeholder.jpg" // Provide a placeholder image URL or adjust as needed
										}
										width={500}
										height={500}
										quality={10}
										alt="Picture of the author"
										className="w-14 h-14 rounded-full p-1 text-center"
									/>
									<div className="self-center flex flex-col text-left p-2">
										<h5 className="font-bold">
											{Array.isArray(videodata?.owner)
												? videodata?.owner[0]?.username
												: videodata?.owner?.username}
										</h5>
										<p className="font-light text-xs">156k subscribers</p>
									</div>
									<div className="self-center">
										<button className="subscribe_btn">Subscribe</button>
									</div>
								</div>
								<div className="flex gap-5 self-center">
									<div>
										<button>
											<ThumbUpOffAltIcon />
										</button>
										<button>
											<ThumbDownOffAltIcon />
										</button>
									</div>
									<div>
										<ScreenShareIcon />
									</div>
									<div>
										<MoreHorizIcon />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.user_videos}>
					<div className="flex flex-col justify-center gap-0">
						{uservideodata.map((item) => (
							<div
								key={item._id}
								className={`${styles.user_videos_video} videocontrooler  text-center`}
							>
								<video
									// autoPlay
									loop
									muted
									className="cursor-pointer  border rounded"
									onClick={() => routeToIndividualVideo(item)}
								>
									<source src={item.videoFile} type="video/mp4" />
								</video>
								<div className="flex flex-col border border-black-200 rounded">
									<div className="flex justify-start">
										<Image
											src={
												!Array.isArray(item.owner) &&
												typeof item.owner.avatar === "string"
													? item.owner.avatar
													: "/placeholder.jpg" // Provide a placeholder image URL or adjust as needed
											}
											width={500}
											height={500}
											quality={10}
											alt="Picture of the author"
											className="w-14 h-14 rounded-full p-1 text-center"
										/>
										<p className="text-lg font-medium text-center">
											{item.title}
										</p>
									</div>
									<div className="flex flex-col justify-end items-start mx-10 text-gray-400 text-sm">
										<p>
											{Array.isArray(item.owner)
												? item.owner[0]?.username
												: item.owner?.username}
										</p>
										<div className="flex justify-start gap-2">
											<p>views</p>
											<p>{dateOnVideoUploaded(item.createdAt)}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default VideoPage;
