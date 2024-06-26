"use client";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const UseAuth = () => {
	const [allowuser, setAllowUser] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");

		function isTokenExpired(token: string | null) {
			if (!token) {
				// Token is not provided
				setAllowUser(false);

				return true;
			}

			const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode token payload
			const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds
			const currentTime = Date.now(); // Current time in milliseconds
			console.log(currentTime, expirationTime);
			return currentTime > expirationTime; // Return true if token is expired, false otherwise
		}

		if (token && !isTokenExpired(token)) {
			setAllowUser(true);
			console.log("token", token);
		} else {
			console.log("expired", token);

			localStorage.clear();
			router.push("/login");
			setAllowUser(false);
		}
	}, [allowuser]); // Empty dependency array means this effect runs only once

	return { allowuser, setAllowUser };
};

export default UseAuth;
