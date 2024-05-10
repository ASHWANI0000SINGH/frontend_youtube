"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Video from "../Video/Video";
import { VideoType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";
import styles from "./AllVideo.module.css";

const AllVideo = () => {
	const [videoData, setVideoData] = useState<VideoType[]>([]);
	useEffect(() => {
		const getAllVideo = async () => {
			const result = await axios(`${dev_url}/video/fetch-allvideo`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			console.log("all video", result);
			setVideoData(result.data.data);
		};
		getAllVideo();
	}, []);

	return (
		<div className={`${styles.allvideocontainer} text-center `}>
			<div>
				<Video videoData={videoData} />
			</div>
		</div>
	);
};

export default AllVideo;
