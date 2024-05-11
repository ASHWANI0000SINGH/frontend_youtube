"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { FormDataType } from "./allinterface";

export interface UserContextType {
	loggedInUser: FormDataType | null;
	setLoggedInUser: React.Dispatch<React.SetStateAction<FormDataType | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

interface ThemeProviderProps {
	children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const [loggedInUser, setLoggedInUser] = useState<FormDataType | null>(null);

	useEffect(() => {
		const userFromLocalStorage = localStorage.getItem("loggedInUser");
		if (userFromLocalStorage) {
			setLoggedInUser(JSON.parse(userFromLocalStorage));
		}
	}, []);

	return (
		<>
			<UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
				{children}
			</UserContext.Provider>
		</>
	);
}
