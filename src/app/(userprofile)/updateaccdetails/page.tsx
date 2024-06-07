"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { UpdateUserDetailsType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateEmail, updateUserName } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";

const Page: React.FC = () => {
	const [formData, setFormData] = useState<UpdateUserDetailsType>({
		email: "",
		username: "",
	});
	const dispatch = useDispatch();

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
				toast.success("user details succesfully modifies");
				// console.log("result", result.data);
				dispatch(updateEmail(result.data.data.email));
				dispatch(updateUserName(result.data.data.username));

				// console.log("user details changed", result.data);
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
	const router = useRouter();
	const goBack = () => {
		console.log("clicked");
		router.back();
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
			<div className="bg-red flex justify-center">
				<button className="text-center  text-black p-2" onClick={goBack}>
					Go Back
				</button>
			</div>
		</>
	);
};

export default Page;
