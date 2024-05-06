"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Video from "../Video/Video";
import { FormDataType } from "@/app/(auth)/signup/page";

export interface VideoType {
  createdAt: string;
  duration: number;
  owner: string;
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoFile: string;
  _id: string;
  users: FormDataType[];
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
      setVideoData(result.data.data);
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
