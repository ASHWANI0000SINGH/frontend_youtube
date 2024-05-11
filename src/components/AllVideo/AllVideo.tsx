"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Video from "../Video/Video";
import { VideoType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";
import styles from "./AllVideo.module.css";
import { useQuery } from "@tanstack/react-query";

const AllVideo = () => {
	const [videoData, setVideoData] = useState<VideoType[]>([]);
	// useEffect(() => {
	// 	getAllVideo();
	// }, []);
	const getAllVideo = async () => {
		const result = await axios(`${dev_url}/video/fetch-allvideo`);
		console.log("all video", result);
		// setVideoData(result.data.data);
		return result.data.data;
	};

	const { data, isLoading, isError } = useQuery({
		queryFn: async () => await getAllVideo(),
		queryKey: ["allVideo"], //Array according to Documentation
	});
	console.log("data", data, "isloading", isLoading, "iserror", isError);

	return (
		<div className={`${styles.allvideocontainer} text-center `}>
			<div>
				<Video videoData={data} isLoading={isLoading} isError={isError} />
			</div>
		</div>
	);
};

export default AllVideo;
