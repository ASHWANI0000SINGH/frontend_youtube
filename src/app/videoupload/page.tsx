"use client";
import { useState, ChangeEvent, FormEvent, useContext } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { UserContext } from "../provider";

export interface VideoDataType {
	duration: string;
	title: string;
	thumbnail: string;
	owner: string;
	videoFile: File | string;
}

const Page: React.FC = () => {
	const loggedInUser = useContext(UserContext);
	console.log("logged in user", loggedInUser);
	const [loading, setLoading] = useState(false);

	// const ownerArray = loggedInUser && loggedInUser?.loggedInUser;

	const [formData, setFormData] = useState<VideoDataType>({
		thumbnail: "",
		videoFile: "",
		title: "",
		duration: "",
		owner: "",
	});

	const router = useRouter();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFormData({ ...formData, [e.target.name]: e.target.files[0] });
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (
			formData.videoFile !== null &&
			formData.duration !== null &&
			formData.thumbnail !== null &&
			formData.owner !== null &&
			formData.title !== null
		) {
			console.log("formdata", formData);
			try {
				setLoading(true);

				const formDataToSend = new FormData();
				formDataToSend.append("duration", formData.duration);
				formDataToSend.append("title", formData.title);
				formDataToSend.append("thumbnail", formData.thumbnail);
				if (loggedInUser && loggedInUser.loggedInUser) {
					formDataToSend.append("owner", loggedInUser?.loggedInUser?._id || "");
				}
				if (formData.videoFile instanceof File) {
					formDataToSend.append("videoFile", formData.videoFile);
				}

				const result = await axios.post(
					"http://localhost:5000/api/v1/video/upload",
					formDataToSend,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				console.log("result");
				if (result.data) {
					setLoading(false);
					router.push("/");
				}
				console.log("Video uploaded successfully", result);
			} catch (error) {
				console.error("Error uploading video:", error);
			}
		} else {
			alert("please fill the complete form");
		}
	};
	if (loading) {
		return <p className="text-center">Uploading...</p>;
	}

	return (
		<>
			<h1 className="text-center text-xl font-bold">Video Upload</h1>
			<div className="flex justify-center m-5">
				<form
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					className="grid w-full max-w-sm items-center gap-1.5"
				>
					<Input
						type="text"
						name="title"
						placeholder="video title"
						onChange={handleChange}
					/>
					<br />
					<Input
						type="text"
						name="thumbnail"
						placeholder="thumbnail"
						onChange={handleChange}
					/>
					<br />
					<Input
						type="text"
						name="duration"
						placeholder="duration"
						onChange={handleChange}
					/>
					<br />
					<Input type="file" name="videoFile" onChange={handleFileChange} />
					<br />
					<button className="bg-black text-white p-2 " type="submit">
						Upload Video
					</button>
				</form>
			</div>
		</>
	);
};

export default Page;
