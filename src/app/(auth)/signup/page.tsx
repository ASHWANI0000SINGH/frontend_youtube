"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormDataType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";
import Link from "next/link";
import styles from "./signup.module.css";

const Page: React.FC = () => {
	const [formData, setFormData] = useState<FormDataType>({
		username: "",
		email: "",
		password: "",
	});
	const router = useRouter();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (
			formData.email !== "" &&
			formData.password !== "" &&
			formData.username !== ""
		) {
			console.log("formdata", formData);

			try {
				const result = await axios.post(`${dev_url}/users/register`, formData);
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
				<Input
					type="text"
					name="username"
					placeholder="Username"
					onChange={handleChange}
				/>
				<br />
				<Input
					type="email"
					name="email"
					placeholder="Email"
					onChange={handleChange}
				/>

				<br />
				<Input
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
				/>
				<br />
				<button className=" bg-black  text-white p-2 " type="submit">
					Register
				</button>
				<div className="m-2 text-center">
					<span>Already Have An Account ?</span>
					<Link className={`${styles.login_link} m-2 p-2  `} href={"/login"}>
						Login
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Page;
