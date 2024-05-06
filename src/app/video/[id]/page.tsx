"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import styles from "./video.module.css";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { VideoType } from "@/components/AllVideo/AllVideo";

// interface UserType1 {
//   username: string;
//   email: string;
//   avatar: string;
//   coverImage: string;
// }
// interface VideoType1 {
//   createdAt: string;
//   duration: number;
//   owner: UserType1;
//   thumbnail: string;
//   title: string;
//   updatedAt: string;
//   videoFile: string;
//   _id: string;
//   isPublished: boolean;
// }
// interface UserVideoDataType {
//   duration: string;
//   isPublished: boolean;
//   owner: UserType1;
//   thumbnail: string;
//   title: string;
//   createdAt: string;

//   updatedAt: string;
//   videoFile: string;
//   views: string;
// }

const VideoPage = () => {
  const [videodata, setVideoData] = useState<VideoType | null>(null);
  const [uservideodata, setUserVideoData] = useState<VideoType[]>([]);

  // const [user, setUser] = useState<UserType1 | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      console.log("video id resuly", result.data.data.owner.username);
      setVideoData(result.data.data);
      // setUser(result.data.data[1]);
      setLoading(false);
    };
    getAllVideo();
  }, [params.id, videodata?.videoFile]);

  useEffect(() => {
    const getAllUserVideos = async () => {
      const result = await axios(
        `http://localhost:5000/api/v1/video/fetch-user-video/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("uservideos", result.data.data);
      setUserVideoData(result.data.data);
    };
    getAllUserVideos();
  }, [params.id]);
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  const dateOnVideoUploaded = (createdAt: string) => {
    const uploadDate = new Date(createdAt);
    const month = ("0" + (uploadDate.getMonth() + 1)).slice(-2); // Format month (01 - 12)
    const day = ("0" + uploadDate.getDate()).slice(-2); // Format day (01 - 31)
    return `${month}/${day}`; // Return formatted date (MM/DD)
  };
  const routeToIndividualVideo = (item: VideoType) => {
    router.push(`/video/${item?._id}`);
  };

  return (
    <>
      <div className="flex mx-20 p-4  h-screen  justify-between ">
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
                    src={videodata?.owner.avatar}
                    alt="Picture of the author"
                    className=" w-14 h-14 rounded-full p-1 text-center "
                  />
                  <div className="  self-center flex flex-col text-left p-2">
                    <h5 className="font-bold">{videodata?.owner?.username}</h5>
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
        <div className="user_videos ">
          <div className="flex  flex-col justify-center gap-0 ">
            {uservideodata &&
              uservideodata?.map((item: VideoType) => {
                return (
                  <>
                    <div
                      className={`${styles.videocontrooler} w-80 h-80 text-center   `}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        className={` cursor-pointer w-80 h-44 border rounded  `}
                        onClick={() => routeToIndividualVideo(item)}
                      >
                        <source src={item.videoFile} type="video/mp4" />
                      </video>

                      <div className="flex flex-col border border-black-200 rounded ">
                        <div className="flex justify-start ">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.owner?.avatar}
                            alt="Picture of the author"
                            className=" w-10 h-10 rounded-full p-1 text-center "
                          />
                          <p className=" text-lg font-medium  text-center ">
                            {item.title}
                          </p>
                        </div>
                        <div className="flex flex-col justify-end  items-start   mx-10  text-gray-400 text-sm">
                          <p>{item.owner.username}</p>
                          <div className="flex justify-start gap-2">
                            <p> views </p> *
                            <p>{dateOnVideoUploaded(item.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
