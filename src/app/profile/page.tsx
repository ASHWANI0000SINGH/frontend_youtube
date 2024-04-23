"use client";
import { isAuthenticated } from "@/utils/auth";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect } from "react";

const Profile = () => {
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (!isAuthenticated) {
  //       router.push("/");
  //     }
  //   }, [router]);
  return (
    <>
      <main className="text-center h-screen flex justify-center items-center">
        <div>
          <h1>Profile Profile</h1>
        </div>
      </main>
    </>
  );
};

export default Profile;
