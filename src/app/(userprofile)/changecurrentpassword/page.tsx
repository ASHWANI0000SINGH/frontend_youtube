"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { PasswordChangeType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
	const [formData, setFormData] = useState<PasswordChangeType>({
		newPassword: "",
		confirmNewPassword: "",
		oldPassword: "",
	});
	const router = useRouter();
	const goBack = () => {
		console.log("clicked");
		router.back();
	};

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
					`${dev_url}/users/change-password`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				toast.success("password succesfully changed");
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
		<>
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
			<div className="bg-red flex justify-center">
				<button className="text-center  text-black p-2" onClick={goBack}>
					Go Back
				</button>
			</div>
		</>
	);
};

export default Page;
