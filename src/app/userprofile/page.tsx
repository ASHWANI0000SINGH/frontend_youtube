"use client";
import { isAuthenticated } from "@/utils/auth";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { UserContext } from "../provider";
import Link from "next/link";

const Profile = () => {
  const loggedInUser = useContext(UserContext);
  console.log("logged in user profile", loggedInUser);
  return (
    <>
      <div className="flex flex-col    text-start mx-20 p-10 justify-start ">
        <div>
          <h5 className="font-bold">Account</h5>
          <p className="text-xl font-medium mt-6">
            Choose how you appear and what you see on YouTube
          </p>
          <p className="text-sm font-light mt-2">
            Signed in as {loggedInUser?.username}
          </p>
        </div>
        <hr />
        <div className="youtube-chaneel mt-6">
          <h5 className="font-bold">Your Youtube Channel</h5>
          <p className="text-sm font-light mt-2">
            This is your public presence on YouTube. You need a channel to
            upload your own videos, comment on videos, or create playlists.
          </p>
          <div className="mt-4 flex justify-start gap-20">
            <h5 className="font-bold"> Your Channel</h5>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={loggedInUser?.avatar}
                alt=""
                className=" w-6 h-6 rounded-full  "
              />
              <h5 className="text-md font-medium">{loggedInUser?.username}</h5>
            </div>
          </div>
        </div>
        <hr />
        <div className="your-account mt-6">
          <h5 className="font-bold">Your account</h5>

          <p className="text-sm font-light mt-2">
            You sign in to YouTube with your Google Account
          </p>
        </div>
        <div className="mt-5">
          <h5 className="font-bold">More settings for {loggedInUser?.email}</h5>
          <div className="mt-2">
            <Link
              href="/moresettings"
              className="border border-black w-20 p-1  rounded bg-black text-white"
            >
              More Settings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
