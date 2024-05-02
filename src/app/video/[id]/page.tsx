"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./video.module.css";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import axios from "axios";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@/components/ui/button";

interface UserType1 {
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
}
interface VideoType1 {
  createdAt: string;
  duration: number;
  owner: string;
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoFile: string;
  _id: string;
}

const VideoPage = () => {
  const [videodata, setVideoData] = useState<VideoType1 | null>(null);
  const [user, setUser] = useState<UserType1 | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams<{
    [x: string]: any;
    tag: string;
    item: string;
  }>();

  useEffect(() => {
    const getAllVideo = async () => {
      const result = await axios(
        `http://localhost:5000/api/v1/video/fetch-byId/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setVideoData(result.data.data[0]);
      setUser(result.data.data[1]);
      setLoading(false);
    };
    getAllVideo();
  }, [params.id, videodata?.videoFile]);
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <div className="flex mx-20 p-4  h-screen  justify-center">
        <div className=" text-center margin-auto  ">
          {videodata && (
            <video autoPlay loop muted controls className={`   h-2/3 `}>
              <source src={videodata?.videoFile} type="video/mp4" />
            </video>
          )}

          <div className="flex flex-col border border-black-200 rounded ">
            <div className=" ">
              <h1 className=" text-lg font-medium text-start  ">
                {videodata?.title} ashwani
              </h1>
              <div className="flex  justify-between  self-center ">
                <div className="flex justify-start gap-2 self-center  ">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user?.avatar}
                    alt="Picture of the author"
                    className=" w-14 h-14 rounded-full p-1 text-center "
                  />
                  <div className="  self-center flex flex-col text-left p-2">
                    <h5 className="font-bold">{user?.username}</h5>
                    <p className="font-light text-xs"> 156k subscribers</p>
                  </div>
                  <div className="self-center ">
                    <button className={`${styles.subscribe_btn}`}>
                      Subscribe{" "}
                    </button>
                  </div>
                </div>
                <div className=" flex gap-5  self-center ">
                  <div className=" ">
                    <button>
                      <ThumbUpOffAltIcon />
                    </button>
                    <button>
                      <ThumbDownOffAltIcon />
                    </button>
                  </div>
                  <div>
                    <ScreenShareIcon />
                  </div>
                  <div>
                    <MoreHorizIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
