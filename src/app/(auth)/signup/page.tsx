"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormDataType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";

const Page: React.FC = () => {
	const [formData, setFormData] = useState<FormDataType>({
		// username: "",
		email: "",
		// fullName: "",
		password: "",
		// avatar: "",
		// coverImage: "",
	});
	const router = useRouter();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files) {
	// 		setFormData({ ...formData, [e.target.name]: e.target.files[0] });
	// 	}
	// };

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (
			formData.email !== "" &&
			formData.password !== ""
			// formData.avatar !== "" &&
			// formData.coverImage !== "" &&
			// formData.fullName !== "" &&
			// formData.username !== ""
		) {
			console.log("formdata", formData);

			try {
				const formDataToSend = new FormData();
				// formDataToSend.append("username", formData.username);
				formDataToSend.append("email", formData.email);
				// formDataToSend.append("fullName", formData.fullName);
				formDataToSend.append("password", formData.password);
				// if (formData.avatar) {
				// 	formDataToSend.append("avatar", formData.avatar);
				// }
				// if (formData.coverImage) {
				// 	formDataToSend.append("coverImage", formData.coverImage);
				// }

				const result = await axios.post(
					`${dev_url}/users/register`,
					formDataToSend
				);
				if (result.data) {
					router.push("/login");
				}
				console.log("Registration successful", result);
			} catch (error) {
				console.error("Error registering user:", error);
			}
		} else {
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
				{/* <Input
					type="text"
					name="username"
					placeholder="Username"
					onChange={handleChange}
				/>
				<br /> */}
				<Input
					type="email"
					name="email"
					placeholder="Email"
					onChange={handleChange}
				/>
				{/* <br />
				<Input
					type="text"
					name="fullName"
					placeholder="Full Name"
					onChange={handleChange}
				/> */}
				<br />
				<Input
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
				/>
				<br />
				{/* <Input
					type="file"
					name="avatar"
					onChange={handleFileChange}
					placeholder="avatart"
				/> */}
				{/* <span className="text-xs">Select Avatar File</span> */}
				<br />
				{/* <Input type="file" name="coverImage" onChange={handleFileChange} />{" "}
				<span className="text-xs">Select Cover Image</span>
				<br /> */}
				<button className=" bg-black  text-white p-2 " type="submit">
					Register
				</button>
			</form>
		</div>
	);
};

export default Page;
