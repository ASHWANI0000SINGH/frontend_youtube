"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Video from "../Video/Video";
import { VideoType } from "@/app/allinterface";

const AllVideo = () => {
	const [videoData, setVideoData] = useState<VideoType[]>([]);
	useEffect(() => {
		const getAllVideo = async () => {
			const result = await axios(
				"http://localhost:5000/api/v1/video/fetch-allvideo",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			console.log("all video", result);
			setVideoData(result.data.data);
		};
		getAllVideo();
	}, []);

	return (
		<div className="text-center">
			<div>
				<Video videoData={videoData} />
			</div>
		</div>
	);
};

export default AllVideo;
