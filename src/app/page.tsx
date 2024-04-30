"use client";
import AllVideo from "@/components/AllVideo/AllVideo";
import { buttonVariants } from "@/components/ui/button";
import { all } from "axios";
import { access } from "fs";
import Link from "next/link";
import { useEffect, useState, createContext } from "react";
import { FormDataType } from "./(auth)/signup/page";

export default function Home() {
  const [allowuser, setAllowUser] = useState(false);
  let token = null;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    token = localStorage.getItem("accessToken");
    token = localStorage.getItem("accessToken");

    function isTokenExpired(token: string | null) {
      if (!token) {
        // Token is not provided
        return true;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

      const currentTime = Date.now(); // Current time in milliseconds

      return currentTime > expirationTime; // Return true if token is expired, false otherwise
    }

    if (!isTokenExpired(token)) {
      setAllowUser(true);
      // Handle expired token, e.g., redirect to login page or refresh token
    } else {
      alert("token is expired please login ");
      // Proceed with making authenticated requests using the token
    }
  }, []);

  return (
    <>
      {!allowuser ? (
        <>
          <div className=" flex justify-end mx-2 p-5 border-sky-100">
            <div className="m-2">
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
            </div>
            <div className="m-2">
              <Link
                href="/signup"
                className={buttonVariants({ variant: "outline" })}
              >
                Signup
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" ml-5 font-bold mt-5 text-black"></div>
          <div className="video-container">
            <AllVideo />
          </div>
        </>
      )}
    </>
  );
}
