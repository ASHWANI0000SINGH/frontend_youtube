"use client";
import { createContext, useState, useEffect } from "react";
import { FormDataType } from "./(auth)/signup/page";

// createContext is not supported in Server Components
export const UserContext = createContext<FormDataType | null>(null);

export default function ThemeProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState<FormDataType | null>(null);

  useEffect(() => {
    // Retrieve the logged-in user from local storage when the component mounts
    const userFromLocalStorage = localStorage.getItem("loggedInUser");
    if (userFromLocalStorage) {
      setLoggedInUser(JSON.parse(userFromLocalStorage));
    }
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <UserContext.Provider value={loggedInUser}>{children}</UserContext.Provider>
  );
}
