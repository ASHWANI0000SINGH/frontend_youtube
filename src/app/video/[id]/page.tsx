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
import { CommentDataType, VideoType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";
import styles from "./video.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Comment from "@/components/Comment/Comment";
import { useAppSelector } from "@/redux/store";
import toast from "react-hot-toast";

const VideoPage = () => {
	const [videodata, setVideoData] = useState<VideoType | null>(null);
	const [uservideodata, setUserVideoData] = useState<VideoType[]>([]);
	const [loading, setLoading] = useState(true);
	const [likes, setLikes] = useState(0);
	const [disikes, setDisLikes] = useState(0);
	const [copied, setCopied] = useState(false);

	// const handleCopy = () => {
	//   navigator.clipboard.writeText(textToCopy)
	// 	.then(() => {
	// 	  setCopied(true);
	// 	  setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
	// 	})
	// 	.catch(err => console.error('Failed to copy text: ', err));
	// };

	const authState = useAppSelector((state) => state.auth.loggedInUser);
	const [fetchTrigger, setFetchTrigger] = useState(false);

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
				setUserVideoData(result.data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user videos:", error);
			}
		};
		fetchUserVideos();
	}, [params.id]);

	useEffect(() => {
		const fetchAllLikesOnVideoId = async () => {
			const result = await axios(`${dev_url}/likes/getAllLikes/${params.id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			setLikes(result.data.data.length);
			console.log("likes result", result.data.data.length);
		};
		const fetchAllDisLikesOnVideoId = async () => {
			const result = await axios(
				`${dev_url}/dislikes/getAlldislikes/${params.id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			console.log("dlikes result", result.data.data.length);
			setDisLikes(result.data.data.length);
		};
		fetchAllDisLikesOnVideoId();
		fetchAllLikesOnVideoId();
	}, [fetchTrigger, params.id]);

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
	const addLikesHandler = async () => {
		try {
			const userId = authState?._id;

			const payload = {
				// video:params._id
				likedBy: userId,
			};

			const result = await axios.post(
				`${dev_url}/likes/addLikes/${params.id}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			toast.success("Liked a Video"); // Displays a success message

			setFetchTrigger(!fetchTrigger);

			console.log("added like", result);
		} catch (error) {
			toast.error("already liked the video");
			console.log("error", error);
		}
	};
	const addDisLikesHandler = async () => {
		try {
			const userId = authState?._id;

			const payload = {
				// video:params._id
				likedBy: userId,
			};

			const result = await axios.post(
				`${dev_url}/dislikes/adddislikes/${params.id}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			toast.success("DisLiked a Video"); // Displays a success message

			setFetchTrigger(!fetchTrigger);

			console.log("disliked added", result);
		} catch (error) {
			toast.error("already  dis liked the video");
			console.log("error", error);
		}
	};
	const shareVideoLinkHandler = () => {
		const url = `https://frontend-youtube.vercel.app/video/${params.id}`;
		console.log("url", url);
		toast.success("copied video url share it with your friends");

		navigator.clipboard
			.writeText(url)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
			})
			.catch((err) => console.error("Failed to copy text: ", err));
	};

	return (
		<>
			<div
				className={`${styles.routed_video_section} flex justify-between mx-20 p-4  `}
			>
				<div
					className={`${styles.single_video_conatiner} text-center margin-auto`}
				>
					{videodata && (
						<video
							autoPlay
							loop
							muted
							controls
							className={`${styles.video} rounded`}
						>
							<source src={videodata.videoFile} type="video/mp4" />
						</video>
					)}
					<div
						className={`${styles.video_details}  flex-col border border-black-200 rounded `}
					>
						<div className="m-1 p-1">
							<h1 className="text-lg font-medium text-wrap text-left">
								{videodata?.title}
							</h1>
							<div
								className={`${styles.video_details_section} flex justify-between `}
							>
								<div
									className={`${styles.video_details_section_box1} flex justify-start gap-2   items-center  `}
								>
									<div className={styles.video_details_section_box1_1}>
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
											alt="User Avatar"
											className=" w-10 h-10 rounded-full p-1 text-center "
										/>
										<div className="self-center flex flex-col text-left p-2">
											<h5 className="font-bold">
												{Array.isArray(videodata?.owner)
													? videodata?.owner[0]?.username
													: videodata?.owner?.username}
											</h5>
											<p className="font-light text-xs">156k subscribers</p>
										</div>
									</div>
									<div className="self-center">
										<button className={styles.subscribe_btn}>Subscribe</button>
									</div>
								</div>
								<div
									className={`${styles.video_details_section_box2} flex gap-5 items-center `}
								>
									<div
										className={`${styles.video_like_dislike_container}  flex gap-6`}
									>
										<div>
											<button onClick={addLikesHandler}>
												<ThumbUpOffAltIcon />
											</button>
											{likes}
										</div>
										<div>
											<button onClick={addDisLikesHandler}>
												<ThumbDownOffAltIcon />
											</button>
											{disikes}
										</div>
									</div>
									<div>
										<ScreenShareIcon onClick={shareVideoLinkHandler} />
									</div>
									<div>
										<MoreHorizIcon />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<Comment />
					</div>
				</div>

				<div className={styles.user_videos}>
					<div
						className={`${styles.video_check} flex flex-col justify-center gap-3`}
					>
						{uservideodata.map((item) => (
							<div
								key={item._id}
								className={`${styles.user_videos_video} videocontrooler  text-center cursor-pointer`}
								onClick={() => routeToIndividualVideo(item)}
							>
								<video loop muted className="cursor-pointer  border rounded">
									<source src={item.videoFile} type="video/mp4" />
								</video>
								<div className={styles.vediodetials_container}>
									<div
										className={`${styles.videodetails_alignment} flex flex-row  justify-between `}
									>
										<div className="flex justify-start ">
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
												alt="User Avatar"
												className=" w-10 h-10 rounded-full p-1 text-center "
											/>
											<p className={`${styles.video_title} m-1 text-left `}>
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
												{Array.isArray(item.owner)
													? item.owner[0]?.username
													: item.owner?.username}
											</p>
											<span className="text-center mx-1">
												<DoneIcon className={styles.autorizeduser} />
											</span>
										</div>

										<div className="flex justify-start gap-2">
											<p> 101k views </p>
											<span>
												<FiberManualRecordIcon className={`${styles.dot}`} />
											</span>
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
