"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Video from "../Video/Video";

export type VideoType = {
  createdAt: string;
  duration: number;
  owner: ownerType;
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoFile: string;
  _id: string;
};
export type ownerType = {
  avatar: string;
  fullName: string;
  username: string;
  _id: string;
};
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
      console.log(result.data.data);
      setVideoData(result.data.data);
      console.log("checking");
    };
    getAllVideo();
  }, []);

  return (
    <div className="text-center">
      AllVideo
      <div>
        <Video videoData={videoData} />
      </div>
    </div>
  );
};

export default AllVideo;
