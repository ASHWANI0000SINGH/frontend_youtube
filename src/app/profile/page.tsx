"use client";
import { isAuthenticated } from "@/utils/auth";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect } from "react";
import styles from "./profile.module.css";

const Profile = () => {
  return (
    <>
      <div className="text-center h-screen flex justify-center items-center">
        <div className={styles.account}>
          <h5>Account</h5>
          <p>Choose how you appear and what you see on YouTube</p>
          <p>Signed in as </p>
        </div>
        <hr />
        <div className="youtube-chaneel">
          <h5>Your Youtube Channel</h5>
          <p>
            This is your public presence on YouTube. You need a channel to
            upload your own videos, comment on videos, or create playlists.
          </p>
          <div>
            <h5> Your Channel</h5>
            <div>
              channel logo
              <h5>Channel name</h5>
            </div>
          </div>
        </div>
        <hr />
        <div className="your-account">
          <h5>You sign in to YouTube with your Google Account</h5>
        </div>
      </div>
    </>
  );
};

export default Profile;
