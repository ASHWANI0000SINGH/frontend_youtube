"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { UpdateAvaterType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";

const Page: React.FC = () => {
	const [formData, setFormData] = useState<UpdateAvaterType>({
		avatar: "",
	});
	const [loading, setLoading] = useState(false);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFormData({ ...formData, [e.target.name]: e.target.files[0] });
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (formData.avatar !== "") {
			console.log("formdata", formData);

			try {
				setLoading(true);

				const formDataToSend = new FormData();
				if (formData.avatar) {
					formDataToSend.append("avatar", formData.avatar);
				}

				const result = await axios.post(
					`${dev_url}/users/update-userAvatar`,
					formDataToSend,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				if (result.data) {
					setLoading(false);

					alert("avatar updated");
				}
				console.log("Avatar successfully updated", result);
			} catch (error) {
				console.error("Error while updating avatar:", error);
			}
		} else {
			alert("please fill the complete form");
		}
	};
	if (loading) {
		return <p className="text-center">Uploading...</p>;
	}

	return (
		<div className="flex justify-center m-5">
			<form
				onSubmit={handleSubmit}
				encType="multipart/form-data"
				className=" grid w-full max-w-sm items-center gap-1.5"
			>
				<Input
					type="file"
					name="avatar"
					onChange={handleFileChange}
					placeholder="avatart"
				/>
				<span className="text-xs">Select Avatar File</span>
				<br />

				<br />
				<button className=" bg-black  text-white p-2 " type="submit">
					Update Avatar
				</button>
			</form>
		</div>
	);
};

export default Page;
