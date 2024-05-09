"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { UpdateUserDetailsType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";

const Page: React.FC = () => {
	const [formData, setFormData] = useState<UpdateUserDetailsType>({
		email: "",
		username: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (formData.email !== "" && formData.username !== "") {
			try {
				console.log("formdata", formData);
				const result = await axios.post(
					`${dev_url}/users/updateuserdetails`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				alert("user details succesfully modifies");
				console.log("user details changed", result.data);
				setFormData({
					email: "",
					username: "",
				});
			} catch (error) {
				console.error("Error While updating user details:", error);
			}
		} else {
			console.log("formdata", formData);
			alert("please fill the complete form");
		}
	};

	return (
		<div className="flex justify-center m-5">
			<form
				onSubmit={handleSubmit}
				encType="multipart/form-data"
				className=" grid w-full max-w-sm items-center gap-1.5"
			>
				<Input
					type="email"
					name="email"
					placeholder=" email"
					onChange={handleChange}
				/>
				<br />

				<Input
					type="text"
					name="username"
					placeholder=" username"
					onChange={handleChange}
				/>
				<br />

				<button className="bg-black text-white p-2 " type="submit">
					Update User Deatails
				</button>
			</form>
		</div>
	);
};

export default Page;
