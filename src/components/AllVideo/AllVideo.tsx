"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Video from "../Video/Video";
import { FormDataType } from "@/app/(auth)/signup/page";

export interface VideoType {
  createdAt: string;
  duration: number;
  owner: FormDataType | FormDataType[];
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoFile: string;
  _id: string;
  // users: FormDataType[];
}

const AllVideo = () => {
  const [videoData, setVideoData] = useState<VideoType[]>([]);
  useEffect(() => {
    const getAllVideo = async () => {
      const result = await axios(
        "http://localhost:5000/api/v1/video/fetch-allvideo",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("all video", result);
      setVideoData(result.data.data);
      // setVideoData(result.data.data as VideoType[]); // Type assertion
    };
    getAllVideo();
  }, []);

  return (
    <div className="text-center">
      <div>
        <Video videoData={videoData} />
      </div>
    </div>
  );
};

export default AllVideo;
