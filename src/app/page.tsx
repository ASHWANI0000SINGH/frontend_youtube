"use client";
import AllVideo from "@/components/AllVideo/AllVideo";
import { buttonVariants } from "@/components/ui/button";
import { all } from "axios";
import { access } from "fs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // Assuming token is stored in localStorage under the key 'jwtToken'
  const [allowuser, setAllowUser] = useState(false);
  let token = null;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    token = localStorage.getItem("accessToken");
    console.log("access token", token);
    token = localStorage.getItem("accessToken");

    function isTokenExpired(token: string | null) {
      if (!token) {
        // Token is not provided
        return true;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds
      console.log("expirationTime", expirationTime);

      const currentTime = Date.now(); // Current time in milliseconds
      console.log("currentTime", currentTime);

      return currentTime > expirationTime; // Return true if token is expired, false otherwise
    }

    if (!isTokenExpired(token)) {
      setAllowUser(true);
      console.log("Token is  not expired");
      // Handle expired token, e.g., redirect to login page or refresh token
    } else {
      alert("token is expired please login ");
      console.log("Token is  expired");
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
          <div className=" ml-5 font-bold mt-5 text-black">
            {/* <p className="text-center">Succesfully logged In</p> */}
          </div>
          <div className="video-container">
            <AllVideo />
          </div>
        </>
      )}
    </>
  );
}
