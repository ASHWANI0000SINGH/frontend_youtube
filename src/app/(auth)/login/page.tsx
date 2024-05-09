"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import UseAuth from "@/components/UseAuth";
import { loginDataType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";

const Page: React.FC = () => {
	const [formData, setFormData] = useState<loginDataType>({
		email: "",
		password: "",
	});
	const { setAllowUser } = UseAuth();

	const router = useRouter();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (formData.email !== "" && formData.password !== "") {
			try {
				const result = await axios.post(`${dev_url}/users/login`, formData, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (result.data) {
					setAllowUser(true);
					console.log("result login", result.data);
					router.push("/");
					localStorage.setItem(
						"loggedInUser",
						JSON.stringify(result.data.user.loggedInUser)
					);
					localStorage.setItem("accessToken", result.data.user.accessToken);
				}
			} catch (error) {
				console.error("Error logging in:", error);
			}
		} else {
			alert("Please fill the complete form");
		}
	};

	return (
		<div className="flex justify-center m-5">
			<form
				onSubmit={handleSubmit}
				className="grid w-full max-w-sm items-center gap-1.5"
			>
				<Input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
				/>
				<br />
				<Input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
				/>
				<br />
				<button className="bg-black text-white p-2" type="submit">
					Login
				</button>
			</form>
		</div>
	);
};

export default Page;
