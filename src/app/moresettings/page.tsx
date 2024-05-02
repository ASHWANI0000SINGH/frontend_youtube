"use client";
import React, { useContext } from "react";
import { UserContext } from "../provider";
import Link from "next/link";

const page = () => {
  const loggedInUser = useContext(UserContext);
  console.log("logged in user profile", loggedInUser);
  return (
    <>
      <div className="text-center mt-2 flex flex-col gap-10 mx-20 p-3 justify-start items-center">
        <div>
          <h1 className="font-bold text-2xl leading-9">
            More Settings {loggedInUser?.email}
          </h1>
        </div>
        <div className="changecurrentpassword">
          <Link
            href="/changecurrentpassword"
            className="border border-black w-20 p-3  rounded bg-white text-black"
          >
            Change Current Password
          </Link>
        </div>
        <div className="updateaccdetials">
          <Link
            href="/updateaccdetails"
            className="border border-black w-20 p-3  rounded bg-black text-white"
          >
            update Accout Details
          </Link>
        </div>
        <div className="updateuseravatar">
          <Link
            href="/updateavatar"
            className="border border-black w-20   rounded bg-white text-black p-3"
          >
            update User Avatar
          </Link>
        </div>
        <div className="updateCoverImage">
          <Link
            href="/updatecoverimg"
            className="border border-black w-20 p-3  rounded bg-black text-white"
          >
            update Cover Image
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
