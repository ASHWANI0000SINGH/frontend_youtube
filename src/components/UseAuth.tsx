import React, { useEffect, useState } from "react";

const UseAuth = () => {
	const [allowuser, setAllowUser] = useState(false);

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

			return currentTime > expirationTime; // Return true if token is expired, false otherwise
		}

		console.log(" from auth allowuser", allowuser);

		if (token && !isTokenExpired(token)) {
			console.log(" if cond from auth allowuser", allowuser);

			setAllowUser(true);
		} else {
			console.log("else cond from auth allowuser", allowuser);

			setAllowUser(false);
		}
	}, [allowuser]); // Empty dependency array means this effect runs only once

	return { allowuser, setAllowUser };
};

export default UseAuth;
