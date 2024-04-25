import React from "react";
import { VideoType } from "../AllVideo/AllVideo";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { CardHeader } from "@mui/material";
import Image from "next/image";
import ReactPlayer from "react-player";

const Video = ({ videoData }: VideoType) => {
  console.log("video from video comp", videoData);
  return (
    <>
      <div className="flex justify-start flex-wrap ">
        {videoData &&
          videoData?.map((item: VideoType) => {
            return (
              <>
                <div className="text-center border border-black m-4 p-4">
                  {/* <img
                    src={item.users[0]?.avatar}
                    alt={item._id}
                    width={"100px"}
                  /> */}
                  <video
                    autoPlay
                    loop
                    muted
                    style={{ width: "500px", height: "500px" }}
                  >
                    <source src={item.videoFile} />
                  </video>

                  {/* <ReactPlayer
                    width="530px"
                    height="300px"
                    url={item.videoFile}
                    light="/static/normal-sarong-0007.jpg"
                  /> */}
                  <h1> {item?.thumbnail}</h1>
                  {/* <h1> {item}</h1> */}
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Video;
