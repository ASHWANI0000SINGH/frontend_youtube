"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { PasswordChangeType } from "@/app/allinterface";

const Page: React.FC = () => {
	const [formData, setFormData] = useState<PasswordChangeType>({
		newPassword: "",
		confirmNewPassword: "",
		oldPassword: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (
			formData.oldPassword !== "" &&
			formData.newPassword !== "" &&
			formData.confirmNewPassword !== ""
		) {
			try {
				console.log("formdata", formData);
				const result = await axios.post(
					"http://localhost:5000/api/v1/users/change-password",
					formData,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				alert("password succesfully changed");
				console.log("password changed", result.data);
				setFormData({
					oldPassword: "",
					newPassword: "",
					confirmNewPassword: "",
				});
			} catch (error) {
				console.error("Error While chnaging password:", error);
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
					type="password"
					name="oldPassword"
					placeholder=" old Password"
					onChange={handleChange}
				/>
				<br />

				<Input
					type="password"
					name="newPassword"
					placeholder=" new Password"
					onChange={handleChange}
				/>
				<br />
				<Input
					type="password"
					name="confirmNewPassword"
					placeholder="confirm Password"
					onChange={handleChange}
				/>
				<button className="bg-black text-white p-2 " type="submit">
					Change Password
				</button>
			</form>
		</div>
	);
};

export default Page;
