"use client";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import UseAuth from "@/components/UseAuth";
import { loginDataType } from "@/app/allinterface";
import { dev_url } from "@/url/hosturl";
import { Button } from "@/components/ui/button";
import styles from "./login.module.css";
import Link from "next/link";
import { toast } from "react-hot-toast";

const Page: React.FC = () => {
	const [formData, setFormData] = useState<loginDataType>({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const LoginRefBtn: React.RefObject<HTMLButtonElement> =
		useRef<HTMLButtonElement>(null);
	const { setAllowUser } = UseAuth();

	const router = useRouter();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		if (formData.email !== "" && formData.password !== "") {
			try {
				const result = await axios.post(`${dev_url}/users/login`, formData, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (result.data) {
					setAllowUser(true);
					setLoading(false);

					console.log("result login", result.data);
					toast.success("Succesfully Logged In"); // Displays a success message

					router.push("/");
					localStorage.setItem(
						"loggedInUser",
						JSON.stringify(result.data.user.loggedInUser)
					);
					localStorage.setItem("accessToken", result.data.user.accessToken);
				}
			} catch (error) {
				setLoading(false);
				setError(true);
				console.error("Error logging in:", error);
			}
		} else {
			alert("Please fill the complete form");
		}
	};
	if (loading) {
		if (LoginRefBtn.current !== null) {
			LoginRefBtn.current.disabled = true;
		}
		console.log(LoginRefBtn);
		return <p className="text-center">Loading...</p>;
	}
	if (error) {
		return <p className="text-center bg-red-100">Something went wrong..</p>;
	}

	return (
		<>
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
					<button
						ref={LoginRefBtn}
						// disabled
						className="bg-black text-white p-2"
						type="submit"
					>
						Login
					</button>
					<div className="m-2 text-center">
						<span>Dont Have An Account ?</span>
						<Link
							className={`${styles.signup_link} m-2 p-2  `}
							href={"/signup"}
						>
							SignUp
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default Page;
